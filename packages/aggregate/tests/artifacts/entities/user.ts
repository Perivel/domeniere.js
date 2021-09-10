import { UserId } from '../values/user-id';
import { Name } from './../values/name.value';
import { Entity } from './../../../index';

export class User extends Entity {

    constructor(id: UserId, name: Name) {
        super(id);
        this.__state__.initialize("name", name);
    }

    public name(): Name {
        return this.__state__.get("name");
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    public equals(suspect: any): boolean {
        
        let isEquals = false;

        if (suspect instanceof User) {
            isEquals = (suspect as User).id().equals(this.id());
        }

        return isEquals;
    }

    protected serializeData(): string {
        return JSON.stringify({
            name: this.name().serialize(),
        });
    }

    public updateName(newName: Name): void {
        this.__state__.set("name", newName);
        this.commitStateChanges();
    }
}