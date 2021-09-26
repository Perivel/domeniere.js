# What is DomeiereJS?
DomeniereJS is a Typescript library for creating Framework-Independent applications. You can think of a Domeniere application like a shell or enclosure for your app logic, which leaves out the infrastructure implementation details (i.e. routing, database, etc...). This allows you to quickly adopt your application to many different frameworks as your needs change. With DomeniereJS, you encapsulate the concrete aspects of your application into a modular library you can use anywhere, and pass in any framework specific details as dependencies to adopt its behavior to its environment.

# Prerequisites
In order to begin using Domeniere, your system must meet the following requirements.
- **NodeJS**: You must have at least NodeJS version 14. You can learn more about NodeJS [here](https://nodejs.org/en/).
- **NPM or Yarn**: You will need have either NPM or yarn installed. If you have NodeJS already installed, it should also include an NPM installation. If you prefer to use Yarn, you can install it [here](https://classic.yarnpkg.com/en/).

# Your First Domeniere Application
The easiest way to get started with Domeniere is to use the [Domeniere CLI](https://github.com/Perivel/domeniere-cli). The Domeniere CLI provides several useful commands for managing your application, one of these being scaffolding a new Domeniere project.

Lets first insall the Domeniere CLI. Type the following command into your Terminal.
```
npm install g @domeniere/cli

or

yarn global add @domeniere/cli
```
Running the above command will will install the Domeniere CLI to your local machine. You can confirm we have Domeniere installed using the followig command.
```
domeniere
```
If the Domeniere CLI was installed successfully, you should now see a list of available commands provided by the CLI. The base command provides an overview of what the Domeniere CLI can offer. The command we are particularly interested in is the `new` command, which scaffolds a new Domeniere application. 

So, lets create our first Domeniere application.
```
domeniere new project-name
```
Replace `project-name` with the name of your project. You will be asked some basic questions regarding the details of your project. After answering all the prompts, your Domeniere application will be created for you. 

Once the command completes, you should now see a new directory containing your project.