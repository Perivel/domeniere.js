# Factory
A Factory is responsible for the creation of other objects. 

## Defining a Factory
To define a factory with the [Domeniere CLI](https://github.com/Perivel/domeniere-cli), we can run the following command in our root directory.
```
domeniere create factory <factory name> <module name>
```

We manually define a factory by extending the `AbstractFactory` class.
```ts
import { AbstractFactory } from 'domeniere';

export class UserFactory extends AbstractFactory {
    
    constructor() {
        super();
    }
}
```
We are free to create whatever methods we need. Below, we create a method to create a User instance from a registration.
```ts
export class UserFactory extends AbstractFactory {
    
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
