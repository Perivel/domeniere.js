# Data Transfer Object
A Data Transport Object, or DTO, is a container that is designed to hold entire attributes.

All Data objects are created by extending the `Data` class. 
```ts
import { Data } from '@perivel/fragment';

export class UserLoginData extends Data {

    constructor() {
        super();
    }

    public serialize() {
        return JSON.stringify({

        });
    }
}
```
At its most basic form, the only method we nned to override when creating our own DTO is the `serialize()` method. The serialize method returns a seria.ized version of the data.

Now, we are free to define our data object however way we want.
```ts
import { Data } from '@perivel/fragment';

export class UserLoginData extends Data {

    public readonly username: string;
    public readonly password: string;

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }

    public serialize() {
        return JSON.stringify({
            username: this.username,
            password: this.password
        });
    }
}
```
Notice we define our data properties as public properties.