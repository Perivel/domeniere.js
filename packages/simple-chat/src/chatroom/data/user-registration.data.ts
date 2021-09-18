import { Data } from '@domeniere/dto';
import { MethodUndefinedException } from '@swindle/core';


export class UserRegistrationData extends Data {

    public first_name: string;
    public last_name: string;
    public nickname: string;

    constructor() {
        super();
        this.first_name = "";
        this.last_name = "";
        this.nickname = "";
    }

    public serialize(): string {
        return JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            nickname: this.nickname
        });
    }
}