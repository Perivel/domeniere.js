/**
 * ConsoleLogger
 *
 * ConsoleLogger is a logger that prints to the console.
 */
import { Logger } from "./logger";
export declare class ConsoleLogger extends Logger {
    constructor();
    /**
     * debug()
     *
     * @param className The name of the class that the log is referring to.
     * @param methodName The name of the method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */
    debug(className: string, methodName: string, message: string, data?: object | null): void;
    /**
     * indo()
     *
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */
    info(className: string, methodName: string, message: string, data?: object | null): void;
    /**
     * notice()
     *
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to
     * @param message The log message.
     * @param data any data to be included.
     */
    notice(className: string, methodName: string, message: string, data?: object | null): void;
    /**
     * warn()
     *
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */
    warn(className: string, methodName: string, message: string, data?: object | null): void;
    /**
     * error()
     *
     * @param className The class name the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message
     * @param trace The stack trace.
     * @param data any data to be included.
     */
    error(className: string, methodName: string, message: string, trace: string, data?: object | null): void;
    /**
     * crit()
     *
     * @param className The name of the class being referred to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data any data to be included.
     */
    crit(className: string, methodName: string, message: string, trace: string, data?: object | null): void;
    /**
     * alert()
     *
     * @param className The class the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data any data to be included.
     */
    alert(className: string, methodName: string, message: string, trace: string, data?: object | null): void;
    /**
     * emerg()
     *
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data any data to be included.
     */
    emerg(className: string, methodName: string, message: string, trace: string, data?: object | null): void;
    private format;
}
//# sourceMappingURL=console-logger.d.ts.map