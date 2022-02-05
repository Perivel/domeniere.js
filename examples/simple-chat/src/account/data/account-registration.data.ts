import { Data } from '@domeniere/framework';
import { DateTime, MethodUndefinedException } from '@swindle/core';


export class AccountRegistrationData extends Data {

    constructor(
        public readonly username: string,
        public readonly tag: string,
        public readonly dob: DateTime,
    ) {
        super();
    }

    public serialize(): string {
        return JSON.stringify({
            username: this.username,
            tag: this.tag,
            dob: this.dob.toString(),
        });
    }
}