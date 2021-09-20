# Project Structure
DomeniereJS provides a very simple and scalable project structure.

# The Root Directory
## The index.ts File
The index.ts file is the entry point of your Domeniere library. It's primary purpose is to specify which parts of your project will be exposed to users of your Domeniere library. You will rarely have to touch this file. In the vast majority of cases, the Domeniere CLI will manage this file for you.

## The domconfig.json File
The domconfig.json specifies some basic configurations for your project. You will rarely need to modify this file.

## The package.json File
The package.json file is pretty self-explanitory.

## The tsconfig.json File
The default tsconfig.json file provides some settings out of the box that is tailored to work well with any Domeniere application.

## The src Directory
The src directory contains your application code. When working with Domeniere, you will spend almost all your time working in this directory.

## The dist Directory
The dist directory contains the output of your application. This is just a regular dist folder you would see in any Typescript project.

## The node_modules Directory
This is just a standard node_modules directory found on every NodeJS project.

# The src Directory
The src directory contains your Domeniere application code. There are two notable files here.

### *.eventstore.ts
The eventstore file, denoted by *.eventstore.ts where * represents the name of your project, is your project's EventStore. You EventStore encapsulates how events are savesd and braodcasted within your application. For more information regarding the EventStore, see the Events section.

## The *.api.ts File
The API file, denoted by *.api.ts, where the * represents your project name, contains the primary API object your library users will be interacting with. For more information regarding APIs, see the Api section.

The src directory will also consist of one or more modules, each within their own directories.
