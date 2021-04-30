# Fragment
Fragment is a library to assist in creating framework-independent applications.

# How Fragment Fits into Your Architecture

# How Fragment Helps
- Fragment provides a clean, consistent architecture while still giving you the freedom to make it your own.
- A heacy fcus on Inversion of Control helps keep your applications flexible and portable across different frameworks and technologies.
- Design your applications in small separate "domains" ideal for distributed systems.

# Domain Drien Design
Fragment makes use of a lot of concepts from [Domain Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html).

# Getting Started
Copy the repository link and run the following command in your project
```
npm install <link>
```
Or with Yarn
```
yarn add <link>
```

# The Building Blocks of a Fragment Application
- [Values](src/value/README.md): Representing Descriptive Objects
- [Entities](src/entity/README.md): Representing Identity
- [Aggregates](src/aggregate/README.md): Maintaining consistency among objects.
- [Services](src/service/README.md): Performing Operations on Objects
- [Repositories](src/repository/README.md): Persisting Data
- [Events](src/event/README.md): Letting others know what happened
- [Modules](src/module/README.md): Staying Organized
- [The Domain](src/domain/README.md): Putting It All Togeher
- [APIs](src/api/README.md): Communicating with the World
