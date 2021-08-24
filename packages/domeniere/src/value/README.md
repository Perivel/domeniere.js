# Value Object
A Value Object is an immutable object that represents a descriptive aspect of a domain with no 
conceptual identity. Value Objects are instanciated to implement design elements in 
which we only care about what they are. 

## Defining Value Objects
To define a value with the [Domeniere CLI](https://github.com/Perivel/domeniere-cli), we can run the following command in our root directory.
```
domeniere create value <value name> <module name>
```

We manually define a alue by extending the `Value` base class.

Belew is an example of UserId value object that we will define.
```ts
import { Value } from 'domeniere';

export class UserId extends Value {
    // code goes here.
}
```
You are free to define your value objects in whatever way your requirements dictate. 
```ts
export class UserId extends Value {
    
    private readonly _value: string

    constructor(val: string) {
        super();
        this._value = val;
    }

    public id(): string {
        return this._value;
    }
}
```
In our above example, we create a value object to represents a simple UserId. This object is pretty straightforward, consisting of only one property -- the id value. Notice here that the properties of our Value object are immutable. As a general rule, Value objects should be immutable, favoring replacing them altogether when their values must change.

When defining a Value Object, there are two methods that we need to override. The `equals()` method defines how we determine equality. The `serialize()` mehtod defines how this object will be serialized. Let's first define our `equals()` method.
```ts
export class UserId extends Value {
    
    private readonly _value: string

    constructor(val: string) {
        super();
        this._value = val;
    }

    public id(): string {
        return this._value;
    }

    public equals(suspect: any): boolean {
        if (suspect instanceof UserId) {
            const other = suspect as UserId;
            return this.id() === other.id();
        }
        else {
            return false;
        }
    }
}
```
Here, our `UserId`'s `equal()` method returns true if the suspect is also a UserId instance, and their id values are equal. Otherwise, it returns false.

Next, let's define our `serialize()` method.
```ts
export class UserId extends Value {
    
    private readonly _value: string

    constructor(val: string) {
        super();
        this._value = val;
    }

    public id(): string {
        return this._value;
    }

    public equals(suspect: any): boolean {
        if (suspect instanceof UserId) {
            const other = suspect as UserId;
            return this.id() === other.id();
        }
        else {
            return false;
        }
    }

    public serialize(): string {
        return this.id();
    }
}
```
Here, our serialize method is pretty straightforward. Since the value of UserId is already a string, we simply return the value of the id. 