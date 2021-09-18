import { Data } from '@domeniere/dto';
import { MethodUndefinedException } from '@swindle/core';


export class ConversationData extends Data {

    public id: string;

    constructor() {
        super();
        this.id = "";
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.id
        });
    }
}