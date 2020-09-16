import { ConsoleLoggerDelegate } from './console-logger.delegate';
import { LoggerDelegate } from './logger-delegate'

/**
 * Logger
 * 
 * Logger is the core log module. 
 */

export class Logger {

    private static _instance: Logger;
    private delegate: LoggerDelegate;

    constructor() {
        this.delegate = new ConsoleLoggerDelegate();
    }

    public static instance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    /**
     * debug()
     * 
     * @param className The name of the class that the log is referring to.
     * @param methodName The name of the method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public debug(className: string, methodName: string, message: string, data: object = {}): void {
        this.delegate.debug(className, methodName, message, data);
    }

    /**
     * indo()
     * 
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public info(className: string, methodName: string, message: string, data: object = {}): void {
        this.delegate.info(className, methodName, message, data);
    }

    /**
     * notice()
     * 
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public notice(className: string, methodName: string, message: string, data: object = {}): void {
        this.delegate.notice(className, methodName, message, data);
    }

    /**
     * warn()
     * 
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public warn(className: string, methodName: string, message: string, data: object = {}): void {
        this.delegate.warn(className, methodName, message, data);
    }

    /**
     * error()
     * 
     * @param className The class name the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public error(className: string, methodName: string, message: string, trace: string, data: object = {}): void {
        this.delegate.error(className, methodName, message, trace, data);
    }

    /**
     * crit()
     * 
     * @param className The name of the class being referred to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public crit(className: string, methodName: string, message: string, trace: string, data: object = {}): void {
        this.delegate.crit(className, methodName, message, trace, data);
    }

    /**
     * alert()
     * 
     * @param className The class the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public alert(className: string, methodName: string, message: string, trace: string, data: object = {}): void {
        this.delegate.alert(className, methodName, message, trace, data);
    }

    /**
     * emerg()
     * 
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public emerg(className: string, methodName: string, message: string, trace: string, data: object = {}): void {
        this.delegate.emerg(className, methodName, message, trace, data);
    }

    /**
     * setDelegate()
     * 
     * setDelegate() sets the lot delegate.
     * 
     * @param delegate The delegate to use.
     */

    public setDelegate(delegate: LoggerDelegate): void {
        this.delegate = delegate;
    }
}