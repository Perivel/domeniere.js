

/**
 * Logger
 * 
 * Logger is the core log module. 
 */

export abstract class Logger {

    constructor() {
        //
    }

    /**
     * debug()
     * 
     * @param className The name of the class that the log is referring to.
     * @param methodName The name of the method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public abstract debug(className: string, methodName: string, message: string, data: object|null): void;

    /**
     * indo()
     * 
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public abstract info(className: string, methodName: string, message: string, data: object|null): void;

    /**
     * notice()
     * 
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public abstract notice(className: string, methodName: string, message: string, data: object|null): void;

    /**
     * warn()
     * 
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */

    public abstract warn(className: string, methodName: string, message: string, data: object|null): void;

    /**
     * error()
     * 
     * @param className The class name the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public abstract error(className: string, methodName: string, message: string, trace: string, data: object|null): void;
    /**
     * crit()
     * 
     * @param className The name of the class being referred to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public abstract crit(className: string, methodName: string, message: string, trace: string, data: object|null): void;

    /**
     * alert()
     * 
     * @param className The class the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public abstract alert(className: string, methodName: string, message: string, trace: string, data: object|null): void;

    /**
     * emerg()
     * 
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */

    public abstract emerg(className: string, methodName: string, message: string, trace: string, data: object|null): void;
}