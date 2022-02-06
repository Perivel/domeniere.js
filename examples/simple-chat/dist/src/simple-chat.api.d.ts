import { Api, DomainEvent } from '@domeniere/framework';
import { SimpleChatEventStore } from './simple-chat.eventstore';
import { AccountCreated, AccountData, AccountRegistrationData, AccountRepository, TagData } from './account/account.module';
export declare class SimpleChatApi extends Api {
    private readonly accountsModule;
    private readonly conversationModule;
    constructor(accountsRepository: AccountRepository, eventStore: SimpleChatEventStore);
    createUser(registrationData: AccountRegistrationData): Promise<void>;
    createConversation(): Promise<void>;
    getAccountByTag(tag: TagData): Promise<AccountData>;
    getConversationById(): Promise<any>;
    sendMessage(): Promise<void>;
    handleError(event: DomainEvent): Promise<void>;
    announceRegistration(event: AccountCreated): Promise<void>;
}
//# sourceMappingURL=simple-chat.api.d.ts.map