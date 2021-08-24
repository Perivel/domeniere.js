import { Logger } from "./logger";

/**
 * ConsoleLogger
 * 
 * ConsoleLogger is a logger that prints to the console.
 */

export class ConsoleLogger extends Logger {

    constructor() {
        super();
    }

    /**
     * debug()
     * 
     * @param className The name of the class that the log is referring to.
     * @param methodName The name of the method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */

    public debug(className: string, methodName: string, message: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, '', data!));
    }

    /**
     * indo()
     * 
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */

    public info(className: string, methodName: string, message: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, '', data!));
    }

    /**
     * notice()
     * 
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to
     * @param message The log message.
     * @param data any data to be included.
     */

    public notice(className: string, methodName: string, message: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, '', data!));
    }

    /**
     * warn()
     * 
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */

    public warn(className: string, methodName: string, message: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, '', data!));
    }

    /**
     * error()
     * 
     * @param className The class name the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message
     * @param trace The stack trace.
     * @param data any data to be included.
     */

    public error(className: string, methodName: string, message: string, trace: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, trace, data!));
    }

    /**
     * crit()
     * 
     * @param className The name of the class being referred to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data any data to be included.
     */

    public crit(className: string, methodName: string, message: string, trace: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, trace, data!));
    }

    /**
     * alert()
     * 
     * @param className The class the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data any data to be included.
     */

    public alert(className: string, methodName: string, message: string, trace: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, trace, data!));
    }

    /**
     * emerg()
     * 
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data any data to be included.
     */

    public emerg(className: string, methodName: string, message: string, trace: string, data: object|null = {}): void {
        console.log(this.format(className, methodName, message, trace, data!));
    }

    private format(className: string, methodName: string, message: string, trace: string = '', data: object = {}): string {
        let msg = `[${className}.${methodName}]: ${message}`;
        msg = msg + "\ndata: " + JSON.stringify(data);
        return (trace) ? msg + '\n' + trace : msg;
    }
}