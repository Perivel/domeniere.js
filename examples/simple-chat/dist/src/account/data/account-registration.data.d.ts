import { Data } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
export declare class AccountRegistrationData extends Data {
    readonly username: string;
    readonly tag: string;
    readonly dob: DateTime;
    constructor(username: string, tag: string, dob: DateTime);
    serialize(): string;
}
//# sourceMappingURL=account-registration.data.d.ts.map