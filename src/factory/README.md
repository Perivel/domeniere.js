# Factory
A Factory s an object responsible for the creation of other objects. 

## Defining a Factory
We define a factory by extending the `AbstractFactory` class.
```ts
import { AbstractFactory } from '@perivel/fragment';

export class UserFactory {
    
    constructor() {
        super();
    }
}
```
We are free to create whatever methods we need. Below, we create a method to create a User instance from a registration.
```ts
export class UserFactory {
    
    constructor() {
        super();
    }

    public createFromRegistration(registration: UserRegistration) {
        // ...
        return user;
    }
}
```