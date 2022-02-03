# Using Your Application
Once you have built your Domeniere application, you can import it to your environment like any other NodeJS package. 

So, in our envornment (this can be a framework, another project, or something else), we can install our Domeniere application as follows.
```
npm install <application-source>

or 

yarn add <application-source>
```
Once we have installed our application, we can use it like any other NodeJS dependency.
```ts
// inside our framework.
import { UsersApi } from "users";
import { MyUsersEventStore } from "./path/to/my-users.eventstore.ts";

const usersApi = new UsersApi(
    // dependencies...,
    new MyUsersEventStore()
);
```
Notice here we are using our `Api` and defining a custom `EventStore` specific to our environment. The purpose of our `Api` is to encapsulate functionalkty. 

So, we can use it like any other library.
```ts
const registration = new UserRegistrationData(...);

try {
    await usersApi.createUser(registration);
    return await usersApi.getUserByEmail(registration.email);
}
catch(e) {
    // throw 400 error or do something else.
}
```
Notice here how we use Data Transfer Objects to pass data in to our Domeniere application, and that our environment is is only responsible for proceesing the data returned and handling errors. With your application logic encapsulated inside your Domeniere application, your environment code can remain clean and simple.

> **Note**: You can learn more about Apis in the [Apis](./api) section.

> **Note**: You can learn more about Event Stores in the [Events](./events) section.