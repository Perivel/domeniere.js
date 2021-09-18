import { Data } from '@domeniere/dto';
import { MethodUndefinedException } from '@swindle/core';


export class UserData extends Data {

    public id: string;
    public first_name: string;
    public last_name: string;
    public nickname: string;

    constructor() {
        super();
        this.id = "";
        this.first_name = "";
        this.last_name = "";
        this.nickname = "";
    }

    public serialize(): string {
        return JSON.stringify({
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            nickname: this.nickname,
        });
    }
}