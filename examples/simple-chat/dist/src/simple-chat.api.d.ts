import { Api, DomainEvent } from '@domeniere/framework';
import { SimpleChatEventStore } from './simple-chat.eventstore';
export declare class SimpleChatApi extends Api {
    private readonly accountsModule;
    private readonly conversationModule;
    constructor(eventStore: SimpleChatEventStore);
    createUser(): Promise<void>;
    createConversation(): Promise<void>;
    getUserByTag(): Promise<void>;
    getConversationById(): Promise<any>;
    sendMessage(): Promise<void>;
    handleError(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=simple-chat.api.d.ts.map