# Factories
A Factory is responsible for the creation of other objects. Factories make it easy to create objects, often with the configurations we want. Often when creating objects, we do not need to set all the properties. We often leave properties with their default values. Factories provide a tool to streamline this process and create objects from different situations.

## Defining a Factory
To define a factory, we can run the following command in our root directory.
```
domeniere create factory <module-name>/path/to/factory-name
```
This command will create a factory within the `factories` subdirectory of the module we specify. 

> **Note**: In orfer to create an factory, you need to have created a module that will contain the entity. See the Modules section for more details.

Below is an example of what a basic `UserFactory` would look like.
```ts
import { AbstractFactory } from '@domeniere/factory';
import { User } from './../../entities/entities.well';
import { UserRegistration } from './../../values/values.well';

export class UserFactory extends AbstractFactory {
    
    constructor() {
        super();
    }

    public createFromRegistration(registration: UserRegistration): User {
        // ...
        return user;
    }
}
```
We are really free to create as many factory functions as we need. In this example, we create a method to create a `User` entity from a `UserRegistration` object.