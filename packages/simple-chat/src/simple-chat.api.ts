import { On } from '@domeniere/common';
import { Api } from '@domeniere/core';
import ChatroomModule, { ConversationData, ConversationId, ConversationJoined, ConversationsRepository, CreateConversationCommand, CreateUserCommand, GetConversationByIdQuery, GetConversationsForUserQuery, GetUserByIdQuery, JoinConversationCommand, Message, MessageData, MessageId, MessagePosted, PostMessageCommand, UserData, UserFactory, UserId, UserRegistrationData, UserRegistrationFactory, UserRepository } from './chatroom/chatroom.module';
import { SimpleChatEventStore } from './simple-chat.eventstore';

/**
 * SimpleChatApi
 * 
 * The Api is how your domain connects with the world.
 * 
 * Learn more about Apis at https://github.com/Perivel/domeniere/blob/master/src/api/README.md
 */

export class SimpleChatApi extends Api {

    constructor(
        userRepository: UserRepository,
        conversationRepository: ConversationsRepository,
        eventStore: SimpleChatEventStore
    ) {
        super('simple-chat', eventStore);
        const chatroomModule = new ChatroomModule();
        chatroomModule.registerRepositoryInstance(UserRepository, userRepository);
        chatroomModule.registerRepositoryInstance(ConversationsRepository, conversationRepository);
        this.registerModule(chatroomModule);
    }

    public async createUser(registration: UserRegistrationData): Promise<void> {
        const userRegistration = this.domain.module('chatroom').get(UserRegistrationFactory).createFromData(registration);
        this.domain.module('chatroom').get(CreateUserCommand).execute(userRegistration);
    }

    public async createConversation(host: UserData): Promise<void> {
        const user = this.domain.module('chatroom').get(UserFactory).createFromData(host);
        await this.domain.module('chatroom').get(CreateConversationCommand).execute(user);
    }

    public async getConversationsForUser(user: UserData): Promise<ConversationData[]> {
        const host = this.domain.module('chatroom').get(UserFactory).createFromData(user);
        const conversations = await this.domain.module('chatroom').get(GetConversationsForUserQuery).execute(host);
        return conversations.map(conversation => {
            const data = new ConversationData();
            data.id = conversation.id().id();
            return data;
        });
    }

    public async joinConversation(user: UserData, conversation: ConversationData): Promise<void> {
        const entrant = this.domain.module("chatroom").get(UserFactory).createFromData(user);
        const targetConversation = await this.domain.module('chatroom').get(GetConversationByIdQuery).execute(new ConversationId(conversation.id));
        await this.domain.module('chatroom').get(JoinConversationCommand).execute(entrant, targetConversation);
    }

    public async postMessage(message: MessageData, conversation: ConversationData): Promise<void> {
        const author = await this.domain.module('chatroom').get(GetUserByIdQuery).execute(new UserId(message.author_id));
        const convo = await this.domain.module('chatroom').get(GetConversationByIdQuery).execute(new ConversationId(message.conversation_id));
        const messageToPost = new Message(MessageId.Generate(), author.nickname(), message.content, author.id());
        await this.domain.module('chatroom').get(PostMessageCommand).execute(messageToPost, convo);
    }

    @On(MessagePosted)
    public async outputMessage(event: MessagePosted): Promise<void> {
        const message = event.message();
        const conversation = event.conversation();
        console.log(`${message.content()}`);
    }

    @On(ConversationJoined)
    private async onJoinConversation(event: ConversationJoined): Promise<void> {
        const user = event.user();
        console.log(`${user.nickname().toString()} joined the conversation.`);
    }
}
