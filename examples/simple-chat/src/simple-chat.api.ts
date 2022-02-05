import { Api, DomainEvent, ModuleReference } from '@domeniere/framework';
import { ModuleRef, OnError } from '@domeniere/common';
import { SimpleChatEventStore } from './simple-chat.eventstore';
import ConversationModule from './conversation/conversation.module';
import AccountModule from './account/account.module';


export class SimpleChatApi extends Api {

    @ModuleRef('account')
    private readonly accountsModule!: ModuleReference;

    @ModuleRef('conversation')
    private readonly conversationModule!: ModuleReference;

    constructor(eventStore: SimpleChatEventStore) {
        super('simple-chat', eventStore);
        const accountsModule = new AccountModule();
        this.registerModule(accountsModule);
        const conversationModule = new ConversationModule();
        this.registerModule(conversationModule);
    }

    public async createUser(): Promise<void> {
        //
    }

    public async createConversation(): Promise<void> {

    }

    public async getUserByTag(): Promise<void> {

    }

    public async getConversationById(): Promise<any> {

    }

    public async sendMessage(): Promise<void> {

    }

    @OnError()
    public async handleError(event: DomainEvent): Promise<void> {
        console.log(event.toString());
    }
}