# Vessel
Vessel is a library to assist in creating framework-independent applications.

# How Vessel Fits into Your Architecture

# How Vessel Helps
**Clean Architecture**: Vessel helps keep your architectures small, simple, and clean.
**Create Portable Applications**: Vessel makes no assumptions as to which Framework, Database, or external services you are using. Instead the details of these services can be injected to work with your Vessel application.

# Domain Drien Design
Vessel makes use of a lot of concepts from [Domain Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html).

# Getting Started
Copy the repository link and run the following command in your project
```
npm install <link>
```
Or with Yarn
```
yarn add <link>
```

# The Building Blocks of a Vessel Application
- [Values](src/value/README.md): Representing Descriptive Objects
- [Entities](src/entity/README.md): Representing Identity
- [Aggregates](src/aggregate/README.md): Maintaining consistency among objects.
- [Services](src/service/README.md): Performing Operations on Objects
- [Repositories](src/repository/README.md): Persisting Data
- [Events](src/event/README.md): Letting others know what happened
- [Modules](src/module/README.md): Staying Organized
- [The Domain](src/domain/README.md): Putting It All Togeher
- [APIs](src/api/README.md): Communicating with the World
