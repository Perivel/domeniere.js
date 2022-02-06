import { DomainEvent } from '@domeniere/framework';
import { DateTime } from '@swindle/core';
import { Account } from '../aggregates/aggregates.well';
/**
 * AccountCreated
 *
 * An event indicating that an account was created successfully.
 */
export declare class AccountCreated extends DomainEvent {
    private _account;
    constructor(account: Account, occuredOn?: DateTime, id?: string | undefined);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    account(): Account;
    isError(): boolean;
    serializeData(): string;
    shouldBeBroadcasted(): boolean;
}
//# sourceMappingURL=account-created.event.d.ts.map