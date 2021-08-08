# Domeniere
Domeniere is a library to assist in creating framework-independent Typescript applications.

# How Domeniere Fits into Your Architecture

# How Domeniere Helps
**Clean Architecture**: Domeniere helps keep your architectures small, simple, and clean.
**Create Portable Applications**: Domeniere makes no assumptions as to which Framework, Database, or external services you are using. Instead the details of these services can be injected to work with your Domeniere application.

# Domain Drien Design
Domeniere makes use of a lot of concepts from [Domain Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html).

# Getting Started
To get started with Domeniere, we recommend using the Domeniere CLI](https://github.com/Perivel/domeniere-cli#readme). While it is completely optional, it is the easiest way to create and manage a Domeniere project.

## Manual Installation
If you would rather Inall Domeniere manually, you can do so with NPM
```
npm install domeniere
```
Or with Yarn
```
yarn add domeniere
```
# Usage
Domeniere projects are referred to as **Domains**. Each Domain consists of application-level concepts specific to the Domain. For example, a Users domain would include concepts such as User Accounts, Profiles, and Passwords. 

With the CLI, we can create a new Domain with the following command.
```
domeniere new users
```
Here, we are creating a Users domain. Running this command will create a new users directory with the following structure.
```
node_modules/
dist/
src/
.gitignore
domconfig.json
package.json
tsconfig.json
<domain-name>.ts
yarn.lock or package.lock.json
```
The `node_modules` directory, `dist` directory, `.gitignore` file, `package.json` file, `tsconfig.json` file, and `yarn.lock` or `package.lock.json` files should be pretty self-explanitory. So, we will just focus on the Domeniere-specific elements. 

### The `src/ directory
The `src` directory contains the source files for your domain. By default, it will contain an API, designated by the `<domain-name>.api.ts` file, and an EventStore, designated by the `<domain-name>.eventstore.ts` file. As you build out your domain, the `src` directory will contain your domain [modules](src/module/README.md).

You an learn more about APIs [here](src/api/README.md). And more information about EventStores can be found in the [Events](src/event/README.md) section.

### The domconfig.json File
The `domconfig.json` file consists of some settings regarding your domain. Very rarely will you need to touch this file.

### The <domain-name>.ts file
The `<domain-name>.ts` file is the starting point of your application. If you are using the Domeniere-CLI, you will rarely need to manually edit this file.

## Creating Our First Module
All additional code we will create from this point forward will be contained in [Modules](src/module/README.md). To create our first module, we can run the following command inside our domain directory.
```
domeniere create module accounts
```
This will create an `accounts/` directory within our `src` directory with an `accounts.module.ts` file. This is our module file.

Once we create our `accounts` module, we are free to define it however our requirements dictates.

## The Building Blocks of a Domeniere Project
- [Values](src/value/README.md): Representing Descriptive Objects
- [Entities](src/entity/README.md): Representing Identity
- [Aggregates](src/aggregate/README.md): Maintaining consistency among objects.
- [Services](src/service/README.md): Performing Operations on Objects
- [Factories](src/factory/README.md): Data Conversion
- [Repositories](src/repository/README.md): Persisting Data
- [Events](src/event/README.md): Letting others know what happened
- [Modules](src/module/README.md): Staying Organized
- [The Domain](src/domain/README.md): Putting It All Togeher
- [APIs](src/api/README.md): Communicating with the World
- [Logging](src/utils/log/README.md): A Flexible Solution

# Tests
To run the tests, use the following command with NPM
```
npm run test
```
Or, with Yarn
```
yarn test
```
