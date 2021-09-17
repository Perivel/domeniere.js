"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_chat_1 = require("./simple-chat");
const chatroom_module_1 = require("./src/chatroom/chatroom.module");
class MemoryUserRepository extends simple_chat_1.UserRepository {
    constructor() {
        super();
        this.users = [];
    }
    async getById(id) {
        const user = this.users.find(suspect => suspect.id().equals(id));
        if (!user) {
            throw new Error("User not Found");
        }
        return user;
    }
    async getByNickname(nickname) {
        const user = this.users.find(suspect => suspect.nickname().equals(nickname));
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }
    async remove(aggregate) {
        this.users = this.users.filter(usr => !usr.equals(aggregate));
    }
    async save(aggregate) {
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
    async size() {
        return this.users.length;
    }
}
class MemoryConversationRepository extends chatroom_module_1.ConversationsRepository {
    constructor() {
        super();
        this.conversations = [];
    }
    async getById(id) {
        const convo = this.conversations.find(suspect => suspect.id().equals(id));
        if (!convo) {
            throw new Error("Conversation not found.");
        }
        return convo;
    }
    async getByHost(host) {
        return this.conversations.filter(suspect => suspect.host().equals(host.id()));
    }
    async remove(aggregate) {
        this.conversations = this.conversations.filter(suspect => !suspect.equals(aggregate));
    }
    async save(aggregate) {
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
    async size() {
        return this.conversations.length;
    }
}
class MemorySimpleChatEventStore extends simple_chat_1.SimpleChatEventStore {
    constructor() {
        super();
    }
    async boradcastEvents(eventsToPublish, publishedEvents) {
        let event;
        while (!eventsToPublish.isEmpty()) {
            event = eventsToPublish.dequeue();
            publishedEvents.enqueue(event);
        }
    }
    async getLatestStoredEvent() {
        return null;
    }
    async getTransmittedEventsSince(date) {
        return [];
    }
    async getUnpublishedEvents() {
        return [];
    }
    mapStoredEventToDomainEvent(storedEvent) {
        throw new Error("Undefined");
    }
    mapTransmittedEventToDomainEvent(transmittedEvent) {
        throw new Error('Method not implemented.');
    }
    async saveEvents(eventQueue) {
    }
}
const main = async () => {
    const chat = new simple_chat_1.SimpleChatApi(new MemoryUserRepository(), new MemoryConversationRepository(), new MemorySimpleChatEventStore());
    const registration = new chatroom_module_1.UserRegistrationData();
    registration.first_name = "John";
    registration.last_name = "Appleseed";
    registration.nickname = "John";
    await chat.createUser(registration);
    const john = await chat.getUserByNickname(registration.nickname);
    await chat.createConversation(john);
    const convo = await chat.getConversationsForUser(john);
    const message = new chatroom_module_1.MessageData();
    message.author_id = john.id;
    message.content = "This is my first message.";
    message.conversation_id = convo[0].id;
    await chat.postMessage(message, convo[0]);
};
main().then(() => console.log("Finished!"));
