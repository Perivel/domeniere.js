# Aggregate
An Aggregate is a cluster of associated objects, that can be treated as a single unit. Aggregates are created around a single entity, that maintains some boundary of consistency.

## Creating an Aggregate
To create an Aggregate, we extend the `Aggregate` class.
```ts
import { Aggregate } from '@perivel/fragment';

export class Account extends Aggregate {

    constructor(user: User) {
        super(user);
    }
}
```
Every aggregate takes an entity as its constructor argument. The provided entity will serve as the aggregate root. In our case, our Account aggregate will take a UserEntity as its root.

We are now free to create our aggregate as we see fit. Below is an example.
```ts
import { Aggregate } from '@perivel/fragment';

export class Account extends Aggregate {

    private _verification: AccountVerification;

    constructor(user: User, verification: AccountVerification) {
        super(user);
        this._verification = verification;
    }

    public updateEmail(email: EmailAddress) {
        this.root().setContact(new UserContact(email, this.root().contact().phone()));
    }

    public very(code: VerificationCode): void {
        if (this._verification.code().equals(code)) {
            this._verification.complete();
            this.root().setVerificationDate(DateTime.Now());
        }
        else {
            throw new Error("Verification code does not match");
        }
    }
}
```
We define two methods. The `updateEmail()` method updates the user's account email. Notice that whenever we need access to aggregate root, we reference it through the `root()` method.

The second method we define is the `verify()` method. This method demonstrates how we use aggregates to maintain consistency among our objects  and entities. Here, we check whether or not the passed in verification code matches the one we have on record. If they do match, we mark the verification as complete. But, not only that, we also update our user root entity to indicate when it was verified.