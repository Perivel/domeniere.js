import { Data } from '@domeniere/framework';
import { MethodUndefinedException } from '@swindle/core';


export class TagData extends Data {

    constructor(
        public readonly tag: string
    ) {
        super();
    }

    public serialize(): string {
        return this.tag;
    }
}