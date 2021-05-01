# Entity
An entity is any object defined primarily by it's identity. Entities have life cycles that can drastically change their form or content. Therefore, a thread of continuity must be maintained. An entity has a unique predefined identity in which it's definition, responsibilities, and attributes revolve around. 

## Creating an Entity
To create an entity, we can override the `Entity` class.
```ts
import { Entity } from '@perivel/fragment';

export clas User extends Entity {

}
```
Since all entities are defined by their identity, we must assign some value to represent the identifier of the entity. In our case, we will assume that there is a Value Object called `UserId` that will represent our entity's identity. All identity values for an entity must implement the `Identifier` interface.
```ts
import { Entity } from '@perivel/fragment';

export clas User extends Entity {

    constructor(id: UserId) {
        super(id);
    }
}
```
In addition to its identity, `Entity` objects must also be able to determine equality. For this, we override the `equals()` method.
```ts
import { Entity } from '@perivel/fragment';

export clas User extends Entity {

    constructor(id: UserId) {
        super(id);
    }

    public equals(suspect: any): boolean {
        if (suspect instanceof UserId) {
            return (suspect as UserId).equals(this.id() as UserId);
        }
        else {
            return false;
        }
    }
}
```
Once these requirements are met, we are free to define our entitites in however way our requirements dictate.

Below is a simple example.
```ts
import { Entity } from '@perivel/fragment';

export clas User extends Entity {

    private _profile: UserProfile;

    constructor(id: UserId, profile: UserProfile) {
        super(id);
        this._profile = profile;
    }

    public equals(suspect: any): boolean {
        if (suspect instanceof UserId) {
            return (suspect as UserId).equals(this.id() as UserId);
        }
        else {
            return false;
        }
    }

    public profile(): UserProfile {
        return tihs._profile;
    }

    public setProfile(newProfile: Username): void {
        this._profile = newProfile;
    }
}
```
Here, we define a profile for our user entity, as well as a setter and getter for that property.