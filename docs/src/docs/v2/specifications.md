# Specifications
Specifications allow us to define business rules in our applications. It also lets us combine business rules to perform some boolean logic on our objets.

> You can learn more about the Specification pattern [here](https://en.wikipedia.org/wiki/Specification_pattern).

Domeniere uses the [Swindle Library](https://github.com/Perivel/swindle) to provide common patterns, including implementing Specifications.

## Defining Specifications
We can define a specification by using the following command in our project root directory.
```
domeniere create specification <module-name>/path/to/specification-name
```
This will create a specification file inside the `specifications` subdirectory of our specified module.

> **Note**: In order to create a specification, you must have created a module which will contiain the specification. You can learn more about Modules in the Modules section.

Below is an example definition of an `RegistrationAgeSpecification` class.
```ts
import { CompositeSpecification } from "@swindle/specification";

export class RegistrationAgeSpeciication extends CompositteSpecification {

    constructor() {
        //
    }

    public isSatisfiedBy(registration: Registration): boolean {
        return registration.age() >= 13;
    }
}
```
We define our specification's `isSatisfiedBy()` method to accept an instance of a Registration class and verifies that the registration meets the minimum allowed age to register. In our case, we check the age() property of our registration.

## Using Specifications
Once we have defined our specification, we can use it in our application where we see fit. Below is an example of how we might use our specification.
```ts
const ageSpecification = new RegistrationAgeSpecification();
const isAllowedAge = ageSpecification.isSatisfiedBy(registration);
```

## Chaining Specifications
We can also combine different specifications to perform a wide variety of boolena logic operations.
```ts
const ageSpecification = new RegistrationAgeSpecification();
const usernameSpecification = new RegistrationUsernameSpecification();
const agreementSpecification = new RegistrationAgreementSpecification();

canRegister = usernameSpecification
    .and(ageSpecification)
    .and(agreementSpecification)
    .isSatisfiedBy(registration);
```
Here, we use the `and()` method to chain our specifications together. 

This, however, is not our only option. We can also use the `or()`, `not()`, `andNot(()`, and `orNot()` methods as we see fit.