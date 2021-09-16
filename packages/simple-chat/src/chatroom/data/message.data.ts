import { Data } from '@domeniere/dto';
import { MethodUndefinedException } from '@swindle/core';


export class MessageData extends Data {

    public conversation_id: string;
    public author_id: string;
    public content: string;

    constructor() {
        super();
        this.author_id = "";
        this.conversation_id = "";
        this.content = "";
    }

    public serialize(): string {
        return JSON.stringify({
            author: this.author_id,
            conversation: this.conversation_id,
            content: this.content
        });
    }
}