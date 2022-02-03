import { Api } from '@domeniere/framework';
import { SimpleChatEventStore } from './simple-chat.eventstore';


export class SimpleChatApi extends Api {

    constructor(eventStore: SimpleChatEventStore) {
        super('simple-chat' ,eventStore);
    }

    public async createConversation(): Promise<void> {

    }

    public async createUser(): Promise<void> {

    }

    public async getConversationsForUserId(): Promise<any> {

    }

    public async getUserForTag(): Promise<any> {

    }

    public async joinConversation(): Promise<void> {

    }

    public async sendMessage(): Promise<void> {
        
    }
}