import { Data } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
import { TagData } from './tag.data';
export declare class AccountData extends Data {
    readonly id: string;
    readonly username: string;
    readonly tag: TagData;
    readonly dob: DateTime;
    readonly age: number;
    readonly created_on: DateTime;
    readonly updated_on: DateTime;
    readonly deleted_on: DateTime | null;
    constructor(id: string, username: string, tag: TagData, dob: DateTime, age: number, created_on: DateTime, updated_on: DateTime, deleted_on?: DateTime | null);
    serialize(): string;
}
//# sourceMappingURL=account.data.d.ts.map