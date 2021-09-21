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
import { MethodUndefinedException } from '@swindle/core';
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

    public serializeData(): string {
        return JSON.stringify({
            
        });
    }

    public id(): UserId {
        return super.id() as UserId;
    }
}
```
Notice here we also overrided the entity's `id()` method. The `id()` method returns the identy value of our entity. By default, the `id()` method returns an instnace of the `Identifier` interface, which our assigned `UserId` type implements. However, to ensure type safety, it is highly recommended that the `id()` method be overridden.

In addition to its identity, `Entity` objects must also be able to determine equality. For this, we override the `equals()` method. By default, entities determine equality using its `id`.

The last requirement for creating an `Entity` is to specify how to serialize its properties. To do this, we override the `serializeData()` method. The `serializeData()` method retrns a serialized version of all the properties of the entity that we define. 

Once these requirements are met, we can move on to defining the properties of our entity.

## Entity Properties and State
Entities will usually contan more than just an `id`.  

## Timestamped Entities
