import { Api } from '@domeniere/core';
import { SimpleChatEventStore } from './simple-chat.eventstore';

/**
 * SimpleChatApi
 * 
 * The Api is how your domain connects with the world.
 * 
 * Learn more about Apis at https://github.com/Perivel/domeniere/blob/master/src/api/README.md
 */

export class SimpleChatApi extends Api {

    constructor(eventStore: SimpleChatEventStore) {
        super('simple-chat', eventStore);
    }
}