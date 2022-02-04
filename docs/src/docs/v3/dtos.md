# Data Transfer Objects
A Data Transport Object, or DTO, is a container that is designed to hold entire attributes. We use DTOs to allow users of our Domeniere applications to pass data in and receive data back, instead of giving them direct access to entities and aggregates. 

## Creating DTOs
To define a Data Transfer Object, we can run the following command in our root directory.
```
domeniere create dto <module-name>/path/to/dto-name
```
This will create a new class file in the `data` subdirectory of the specified module.

Below is an example of what a `UserLogin` Data Transfer Object.
```ts
import { Data } from '@domeniere/framework';

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
import { Data } from '@domeniere/framework';

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
Notice we define our data properties as public properties. Since DTOs are just data holders with no functionality of its own, encapsulation of data is not necessary.