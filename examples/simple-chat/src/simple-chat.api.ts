import { Api, DomainEvent, ModuleReference } from '@domeniere/framework';
import { ModuleRef, OnError } from '@domeniere/common';
import { SimpleChatEventStore } from './simple-chat.eventstore';
import ConversationModule from './conversation/conversation.module';


export class SimpleChatApi extends Api {

    @ModuleRef('conversation')
    private readonly conversationModule!: ModuleReference;

    constructor(eventStore: SimpleChatEventStore) {
        super('simple-chat', eventStore);
        const conversationModule = new ConversationModule();
        this.registerModule(conversationModule);
    }

    public printWelcome(): void {
        
    }

    @OnError({})
    public async handleError(event: DomainEvent): Promise<void> {
        console.log(event.toString());
    }
}