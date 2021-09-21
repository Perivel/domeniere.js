# Entities
An entity is any object defined primarily by it's identity. Entities have life cycles that can drastically change their form or content. Therefore, a thread of continuity must be maintained. An entity has a unique predefined identity in which it's definition, responsibilities, and attributes revolve around. 

## Creating an Entity
To define an entity, we can run the following command in our root directory.
```
domeniere create entity <module-name>/path/to/the/entity-name
```
This will create a new directory for the entity in the specified module's entities subdirectory. This subdirectory will contain both an interface file and a class file for our entity.

> **Note**: In orfer to create an entity, you need to have created a module that will contain the entity. See the Modules section for more details.

For this example, let's say we are defining a `User` entity. When we first create our entity, we are given a basic template like the one below.

```ts
import { Entity } from '@domeniere/entity';
import { Identifier } from '@domeniere/value';
import { MethodUndefinedException } from '@swindle/core';
import { UserInterface } from './user.interface';


 export class User extends Entity implements UserInterface {

    constructor(id: Identifier) {
        super(id);
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof User) {
            const other = suspect as User;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public serializeData(): string {
        return JSON.stringify({
            
        });
    }
}
```
Entities are primarily defined by their identities. In Domeniere applications, we assign an `Identifier Value` to represent the identity of an entity. 

> **Note**: You can learn more about `Identifier Values` in the Values section.

For this example, we will assume we already have defined a `UserId` Identity value that we can use as the Id of our `User` entity.

```ts
import { Entity } from '@domeniere/entity';
import { Identifier } from '@domeniere/value';
import { UserInterface } from './user.interface';
import { UserId } from './../../values/values.well';


 export class User extends Entity implements UserInterface {

    constructor(id: UserId) {
        super(id);
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof User) {
            const other = suspect as User;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    public serializeData(): string {
        return JSON.stringify({
            
        });
    }
}
```
Notice here we also overrided the entity's `id()` method. The `id()` method returns the identy value of our entity. By default, the `id()` method returns an instnace of the `Identifier` interface, which our assigned `UserId` type implements. However, to ensure type safety, it is highly recommended that the `id()` method be overridden.

In addition to its identity, `Entity` objects must also be able to determine equality. For this, we override the `equals()` method. By default, entities determine equality using its `id`.

The last requirement for creating an `Entity` is to specify how to serialize its properties. To do this, we override the `serializeData()` method. The `serializeData()` method retrns a serialized version of all the properties of the entity that we define. 

Once these requirements are met, we can move on to defining the properties (or state) of our entity.

## Entity State
As was mentioned earlier, an `Entity` can change its form or content overtime. In order to track changes to our entity, we use the `Entity State`. The `ntity State` tracks and manages changes to properties of our entity (its state). 

### Defining Entity State
Lets begin defining a few properties for our `User` Entity.

```ts
import { Entity } from '@domeniere/entity';
import { UserInterface } from './user.interface';
import { UserId, Username, Address } from './../../values/values.well';


 export class User extends Entity implements UserInterface {

     private _username: Username;
     private _address: Address;

    constructor(id: UserId, username: Username, address: Address) {
        super(id);
        this._username = username;
        this._address = address;
    }

    public address(): Address {
        return this._address;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof User) {
            const other = suspect as User;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    public serializeData(): string {
        return JSON.stringify({
            address: this.address().serialize(),
            username: this.username().serialize()
        });
    }

    public setAddress(newAddress: Address): void {
        this._address = newAddress;
    }

    public setUsername(newUsername: Username): void {
        this._username = newUsername;
    }

    public username(): Username {
        return this._username;
    }
}
```
Here, we define two properties for our `User` entity: a `Username` and an `Address`. Notice how our properties are all their own `Value Objects`. 

So, right now, while we do have our properties defined, we have not yet told Domeniere that these properties are part of the entity state. In order to tell Domeniere that these properties are part of our entity's state, we annotate the properties with the `@State()` decorator. By annotating our properties with the `@State()` decorator, we tell Domeniere that these properties are part of the entity state, and that changes to these properties should be tracked. 

Below is an updated definition of our `User` entity, where we have designated our properties as part of the entity state.

```ts
import { Entity } from '@domeniere/entity';
import { State } from '@domeniere/common';
import { UserInterface } from './user.interface';
import { UserId, Username, Address } from './../../values/values.well';


 export class User extends Entity implements UserInterface {

     @State()
     private _username: Username;

     @State()
     private _address: Address;

    constructor(id: UserId, username: Username, address: Address) {
        super(id);
        this._username = username;
        this._address = address;
    }

    public address(): Address {
        return this._address;
    }

    public equals(suspect: any): boolean {
        let isEquals = false;

        if (suspect instanceof User) {
            const other = suspect as User;
            isEquals = this.id().equals(other.id());
        }

        return isEquals;
    }

    public id(): UserId {
        return super.id() as UserId;
    }

    public serializeData(): string {
        return JSON.stringify({
            address: this.address().serialize(),
            username: this.username().serialize()
        });
    }

    public setAddress(newAddress: Address): void {
        this._address = newAddress;
        this.commitStateChanges();
    }

    public setUsername(newUsername: Username): void {
        this._username = newUsername;
        this.commitStateChanges();
    }

    public username(): Username {
        return this._username;
    }
}
```
Notice here that in our setter methods, we also call the entity's `commitStateChanges()` method. This is mandetory to assist Domeniere in tracking state changes, as we will explain in the Entity Lifecycle. Another detail to note is that **Domeniere uses the assignment operator (`=` sign) to detect state changes**.

### The Entity State Lifecycle
The Entity State lifecycle consists of three phases: Initialization, Commitment, Verification.

In the initialization phase, the entity's state is first set (or initialized). This step usually takes place in the constructor of the entity. In the initialization phase, the initial state of the entiy is set. 

The Commitment phase takes place when a state change has taken place in the entity. The Commitment phase is initiated by calling the entity's `commitStateChanges()` method. Once a state change has been commited, the entity will recognize the new state as its current state and all references to the updated properties will return the new state value. However, until the the next step is completed, it is still possible to rollback or undo the commited state changes.

The Verification phase is the final phase of the Entity State Lifecycle. In the Verification phase, the committed state changes of an entity are either confirmed with the entity's `confirmStateChanges()` method or discarded with the `rollbackStateChanges()` method. This phase is normally executed by an `Aggregate`, or a `Command` or `Query` that utilizes the entity.

> **Note**: You can learn more about Aggregates in the Aggregates section, and about Commands and Queries in the Services section.

## Timestamped Entities
Sometimes, we want or need to attach timstamps to our entities, that indicate when they were created, last updated, or even deleted. In these cases, we can create a `TimestampedEntity`, which will track these timestamps for our entiy  automatically.

### Defining Timestamped Entities
We can create a `Timestamped Entity` by using the following command in our project root.
```
domeniere create entity <module-name>/path/to/the/entity-name --timestamped
```
This will create a new directory for the entity in the specified module's entities subdirectory. This subdirectory will contain both an interface file and a class file for our entity.

> **Note**: In orfer to create an entity, you need to have created a module that will contain the entity. See the Modules section for more details.

The created `Timestamped Entity` is very similar to a regular entity. The only difference is our created `Timestamped Entity` now includes arguments for DateTimes when they were created, updated, and deleted. We can create our entity just like we normally would. Domeniere will automatically manage our timestamps for us in the Entity Lifecycle.