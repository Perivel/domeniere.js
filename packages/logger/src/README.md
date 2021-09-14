# Logging
Since Domeniere promotes creating framework-independent application libraries, we need a solution to enable us to adopt our logging tools to the framework we are using. To solve this problem, Domeniere provides an very customizable `Logger` class.

## Creating Our Own Logger
We create our own Logger in our infrastructure layer (our framework) by overriding the `Logger` class.

```ts
// in our framework
import { Logger } from 'domeniere';

export class MyLogger extends Logger {

    constructor() {
        super();
    }
}
```
The logger class defined seven log levels we must define. You are free to define these however way you see fit.

### debug(className: string, methodName: string, message: string, data: object|null)
The `debug()` method should perform a debug log.

### info(className: string, methodName: string, message: string, data: object|null)
The `info()` method should perform an info log.

### notice(className: string, methodName: string, message: string, data: object|null)
The `notice()` method should perform a notice-level long.

### warn(className: string, methodName: string, message: string, data: object|null)
The `warn()` method should perform a warning level log.

### error(className: string, methodName: string, message: string, trace: string, data: object|null)
The `error()` method should perform an error level log.

### crit(className: string, methodName: string, message: string, trace: string, data: object|null)
The `crit()` method should perform a critical level log.

### alert(className: string, methodName: string, message: string, trace: string, data: object|null)
The `alert()` method should perform an alert level log.

### emerg(className: string, methodName: string, message: string, trace: string, data: object|null)
The `emerge()` method should perform an emergency level log.

## Registering a Logger
Now that we defined our own custom logger, we need to register it to our Domeniere application.
In our [API](../../api/README.md), can pass a logger when instantiating our API.That is eactly how we let Domeniere know about our Logger.

```ts
const api = new MyApi(new MyEventStore(), new MyLogger());
```

## Using Loggers Within Our Domeniere Application.
To make use of logging in our domeniere application, we can access the logger instance from the [Domain](../../domain/README.md).
```ts
Domain.Module().get(Logger).info(MyClass.name, myInstance.method.name, "This is an info log:);
```
The logger will always be contained in the Domain's global module.