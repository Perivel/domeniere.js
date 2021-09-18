import { DomainEvent } from '@domeniere/event';
import { DateTime, MethodUndefinedException } from '@swindle/core';
import { User } from '../chatroom.module';


export class UserCreated extends DomainEvent {

    private _user: User;

    constructor(user: User, occuredOn: DateTime = DateTime.Now(), id: string|undefined = undefined) {
        super(occuredOn, id);
        this._user = user;
    }

    public static EventClassification(): string {
        return 'simple-chat';
    }

    public static EventName(): string {
        return 'user-created';
    }

    public static EventVersion(): number {
        return 1.0;
    }

    public isError(): boolean {
        return false;
    }

    public serializeData(): string {
        return JSON.stringify({
            user: this.user().serialize()
        });
    }

    public shouldBeBroadcasted(): boolean {
        return true;
    }

    public user(): User {
        return this._user;
    }
}