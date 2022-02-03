# Value Objects
A Value Object is an immutable object that represents a descriptive aspect of a domain with no 
conceptual identity. Value Objects are instanciated to implement design elements in 
which we only care about what they are. 

## Defining Value Objects
To define a value, we can run the following command in our root directory.
```
domeniere create value <module-name>/path/to/the/value-name
```
This will create a new directory for the value in the specified module's values subdirectory. This subdirectory will contain both an interface file and a class file for our value.

> **Note**: In order to create a value, you need to have created a module that will contain the value. See the [Modules](./modules) section for more details.

When creating a Value class, we need to override the `equals()` method and the `serialize()` method. The `equals()` method defines how our value will determine equality. The `serialize()` method defines how our value class will be serialized.

Below is an example of a Username value class.
```ts
import { Value } from '@domeniere/value';
import { UsernameInterface } from './username.interface';


 export class Username extends Value implements UsernameInterface {

    private readonly _first: string;
    private readonly _last: string;

    constructor(first: string, last: string) {
        super();
        this._first = first;
        this._last = last;
    }

    public equals(suspect: any): boolean {
        let isEqual = false;

        if (suspect instanceof Username) {
            const other = suspect as Username;
            isEqual = (
                (this.first() === other.first()) && 
                (this.last() === other.last())
            );
        }

        return isEqual;
    }

    public first(): string {
        return this._first;
    }

    public last(): string {
        return this._last;
    }

    public serialize(): string {
        return JSON.stringify({
            first: this.first(),
            last: this.last(),
        });
    }
}
```
We define our `Username` value to have two properties: a first name property and a last name property. We define equality for our `Username` value as both the first name and last name values being equal. How equality is defined for your values is completely up to your requirements. For our `serialize()` function, we simply create an object consisting of our first nme and last name properties, then serialize that object with `JSON.stringify()`. Again, how you choose to seriaize your values is completely up to you.

## Defining Identifier Values
It is very common to define values that represent some kind of an ID. Since this is so common, there is a special type Value object we can define that is designed specifically for this purpose: the `Identifier Value`. 

To define an `Identifier Value`, we can run the following command.
```
domeniere create value <module-name>/path/to/the/value-name --identifier
```
Once this command runs, another new directory will be created. The created value will look very identical to a regular value class. However, there is one major difference -- Our Identifier Value class now implements the `Identifier` iinterface. 

The `Identifier` interface  provides us an `is()` method wich will return the value of our Identifier Value. By default, the `id()` method has an `any` return type. However, it is highly recommended that you specify the return type to be the appropriate type of your ID values. For example, if you are using strings for your ID values, your `id()` method should have a return type of `string`. 

Below is an example definition of a `UserId` Identifier value.

```ts
import { Value } from '@domeniere/value';
import { UUID } from '@swindle/core';
import { UserIdInterface } from './user-id.interface';


 export class UserId extends Value implements UserIdInterface {

    private readonly _value: string;

    constructor(value: string) {
        super();
        this._value = value;
    }

    public static Generate(): UserId {
        return new UserId(UUID.V4().id())
    }

    public equals(suspect: any): boolean {
        let isEqual = false; 

        if (suspect instanceof UserId) {
            const other = suspect as UserId;
            isEqual = this.id() === other.id();
        }

        return isEqual;
    }

    public id(): string {
        return this._value;
    }

    public serialize(): string {
        return this.id();
    }
}
```