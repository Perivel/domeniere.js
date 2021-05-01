# Factory
A Factory is responsible for the creation of other objects. 

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
A handy guideline for defining factories is that we define our factory methods based on the ways we instanciate our objects.