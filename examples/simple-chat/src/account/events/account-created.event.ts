import { DomainEvent } from '@domeniere/framework';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { Account } from '../aggregates/aggregates.well';

/**
 * AccountCreated
 * 
 * An event indicating that an account was created successfully.
 */

export class AccountCreated extends DomainEvent {

    private _account: Account;

    constructor(
        account: Account,
        occuredOn: DateTime = DateTime.Now(), 
        id: string|undefined = undefined
    ) {
        super(occuredOn, id);
        this._account = account;
    }

    public static EventClassification(): string {
        return 'simple-chat';
    }

    public static EventName(): string {
        return 'account-created';
    }

    public static EventVersion(): number {
        return 1.0;
    }

    public account(): Account {
        return this._account;
    }

    public isError(): boolean {
        return false;
    }

    public serializeData(): string {
        return JSON.stringify({
            account: this.account().toString(),
        });
    }

    public shouldBeBroadcasted(): boolean {
        return true;
    }
}