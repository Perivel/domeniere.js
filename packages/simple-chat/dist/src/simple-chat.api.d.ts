import { Api } from '@domeniere/core';
import { ConversationData, ConversationsRepository, MessageData, MessagePosted, UserData, UserRegistrationData, UserRepository } from './chatroom/chatroom.module';
import { SimpleChatEventStore } from './simple-chat.eventstore';
/**
 * SimpleChatApi
 *
 * The Api is how your domain connects with the world.
 *
 * Learn more about Apis at https://github.com/Perivel/domeniere/blob/master/src/api/README.md
 */
export declare class SimpleChatApi extends Api {
    constructor(userRepository: UserRepository, conversationRepository: ConversationsRepository, eventStore: SimpleChatEventStore);
    createUser(registration: UserRegistrationData): Promise<void>;
    createConversation(host: UserData): Promise<void>;
    getUserByNickname(nickname: string): Promise<UserData>;
    getConversationsForUser(user: UserData): Promise<ConversationData[]>;
    joinConversation(user: UserData, conversation: ConversationData): Promise<void>;
    postMessage(message: MessageData, conversation: ConversationData): Promise<void>;
    testState(): Promise<void>;
    outputMessage(event: MessagePosted): Promise<void>;
    private onJoinConversation;
    private handleError;
}
//# sourceMappingURL=simple-chat.api.d.ts.map