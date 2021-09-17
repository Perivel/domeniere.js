import { DomainEvent } from '@domeniere/event';
import { DateTime } from '@swindle/core';
import { User } from '../chatroom.module';
export declare class UserCreated extends DomainEvent {
    private _user;
    constructor(user: User, occuredOn?: DateTime, id?: string | undefined);
    static EventClassification(): string;
    static EventName(): string;
    static EventVersion(): number;
    isError(): boolean;
    serializeData(): string;
    shouldBeBroadcasted(): boolean;
    user(): User;
}
//# sourceMappingURL=user-created.event.d.ts.map