# DomeniereJS Contributing Guide
We are very grateful you are interested in contributing to DomeniereJS. Before you submit your contribution, please take a
moment to review the following guidelines below.

## Issue Reporting
When reporting issues, please keep the following in mind:
TBW

## Pull Request Guidelines
- The `master` branch is just a snapshot of the current stable version of DomeniereJS. All development should be done in dedicated branches. Please **DO NOT** submit Pull Requests agains the `master` branch.

If you are contributing to an existing module:
- Please work in the `src` folder. **DO NOT** include the `dist` folder in your commits.
- Make sure all the tests pass before you submit your Pull Request.
- If you are adding a new feature to one of the modules, please include appropriate test cases, as well as a brief overview of why you believe that feature should be included in that module.

If you are creating a new module:
- Please place your module in the `packages` directory.
- Please follow the module guidelines.

## Development Setup
- NodeJS 14 or higher
- Yarn

## Project Structure
DomeniereJS is composedd of several small modules located in the `packages` directory. This helps keep the project organized and easy to maintain.
- The `framework` modules contains the core DomeniereJS framework source.
- The `common` module consists of commonly used helpers, such as decorators.
- The `state` module consists of DomeniereJS' state management solution.
- The `cli` module consists of the source code for the Domeniere CLI tool.
- The `artifact-builder` module consists of template creation utilties used by the Domeniere CLI to scaffold project artifacts.
