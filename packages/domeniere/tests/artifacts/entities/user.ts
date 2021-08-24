import { UserId } from '../values/user-id';
import { Name } from './../values/name.value';
import { Entity } from './../../../src/entity/entity.module';

export class User extends Entity {

    private _name: Name;

    constructor(id: UserId, name: Name) {
        super(id);
        this._name = name;
    }

    public name(): Name {
        return this._name;
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
}