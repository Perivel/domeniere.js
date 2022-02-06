import { Data } from '@domeniere/framework';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { TagData } from './tag.data';


export class AccountData extends Data {

    constructor(
        public readonly id: string,
        public readonly username: string,
        public readonly tag: TagData,
        public readonly dob: DateTime,
        public readonly age: number,
        public readonly created_on: DateTime,
        public readonly updated_on: DateTime,
        public readonly deleted_on: DateTime|null = null
    ) {
        super();
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.id,
            username: this.username,
            tag: this.tag.serialize(),
            dob: this.dob.toString(),
            age: this.age.toString(),
            created_on: this.created_on.toString(),
            updated_on: this.updated_on.toString(),
            deleted_on: this.deleted_on ? this.deleted_on!.toString() : null
        });
    }
}