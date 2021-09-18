import { DomainEvent, StoredEvent, TransmittedEvent } from '@domeniere/event';
import { DateTime } from '@swindle/core';
import { Queue } from '@swindle/structs';
import { SimpleChatApi, SimpleChatEventStore, UserRepository } from './simple-chat';
import { UserId, User, Nickname, ConversationsRepository, Conversation, ConversationId, UserRegistrationData, MessageData } from './src/chatroom/chatroom.module';

class MemoryUserRepository extends UserRepository {

    private users: User[];

    constructor() {
        super();
        this.users = [];
    }

    public async getById(id: UserId): Promise<User> {
        const user = this.users.find(suspect => suspect.id().equals(id));
        
        if (!user) {
            throw new Error("User not Found");
        }

        return user;
    }

    public async getByNickname(nickname: Nickname): Promise<User> {
        const user = this.users.find(suspect => suspect.nickname().equals(nickname));

        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    }

    public async remove(aggregate: User): Promise<void> {
        this.users = this.users.filter(usr => !usr.equals(aggregate));
    }

    public async save(aggregate: User): Promise<void> {
        const index = this.users.reduce((prev, user, currentIndex) => {
            if (user.equals(aggregate)) {
                return currentIndex;
            }
            else {
                return prev;
            }
        }, -1);
        this.users[index] = aggregate;
    }

    public async size(): Promise<number> {
        return this.users.length;
    }
}


class MemoryConversationRepository extends ConversationsRepository {

    private conversations: Conversation[];

    constructor() {
        super();
        this.conversations = [];
    }

    public async getById(id: ConversationId): Promise<Conversation> {
        const convo = this.conversations.find(suspect => suspect.id().equals(id));

        if (!convo) {
            throw new Error("Conversation not found.");
        }
        return convo;
    }

    public async getByHost(host: User): Promise<Conversation[]> {
        return this.conversations.filter(suspect => suspect.host().equals(host.id()));
    }

    public async remove(aggregate: Conversation): Promise<void> {
        this.conversations = this.conversations.filter(suspect => !suspect.equals(aggregate));
    }

    public async save(aggregate: Conversation): Promise<void> {
        const index = this.conversations.reduce((prev, user, currentIndex) => {
            if (user.equals(aggregate)) {
                return currentIndex;
            }
            else {
                return prev;
            }
        }, -1);
        this.conversations[index] = aggregate;
    }

    public async size(): Promise<number> {
        return this.conversations.length;
    }
}

class MemorySimpleChatEventStore extends SimpleChatEventStore {

    constructor() {
        super();
    }

    protected async boradcastEvents(eventsToPublish: Queue<DomainEvent>, publishedEvents: Queue<DomainEvent>): Promise<void> {
        let event: DomainEvent;
        while(!eventsToPublish.isEmpty()) {
            event = eventsToPublish.dequeue()!;
            publishedEvents.enqueue(event);
        }
    }

    protected async getLatestStoredEvent(): Promise<StoredEvent | null> {
        return null;
    }

    public async getTransmittedEventsSince(date: DateTime | null): Promise<TransmittedEvent[]> {
        return [];
    }

    public async getUnpublishedEvents(): Promise<StoredEvent[]> {
        return [];
    }

    protected mapStoredEventToDomainEvent(storedEvent: StoredEvent): DomainEvent {
        throw new Error("Undefined");
    }

    public mapTransmittedEventToDomainEvent(transmittedEvent: TransmittedEvent): DomainEvent {
        throw new Error('Method not implemented.');
    }

    protected async saveEvents(eventQueue: Queue<StoredEvent>): Promise<void> {

    }
}


const main = async (): Promise<void> => {
    const chat = new SimpleChatApi(
        new MemoryUserRepository(),
        new MemoryConversationRepository(),
        new MemorySimpleChatEventStore(),
    );
    
    const registration = new UserRegistrationData();
    registration.first_name = "John";
    registration.last_name = "Appleseed";
    registration.nickname = "John";
    
    await chat.createUser(registration);
    const john = await chat.getUserByNickname(registration.nickname);
    await chat.createConversation(john);
    const convo = await chat.getConversationsForUser(john);
    
    const message = new MessageData();
    message.author_id = john.id;
    message.content = "This is my first message.";
    message.conversation_id = convo[0].id;
    await chat.postMessage(message, convo[0]);
}

main().then(() => console.log("Finished!"));