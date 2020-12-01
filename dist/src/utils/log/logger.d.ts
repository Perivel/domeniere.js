import { LoggerDelegate } from './logger-delegate';
/**
 * Logger
 *
 * Logger is the core log module.
 */
export declare class Logger {
    private static _instance;
    private delegate;
    constructor();
    static instance(): Logger;
    /**
     * debug()
     *
     * @param className The name of the class that the log is referring to.
     * @param methodName The name of the method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */
    debug(className: string, methodName: string, message: string, data?: object): void;
    /**
     * indo()
     *
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */
    info(className: string, methodName: string, message: string, data?: object): void;
    /**
     * notice()
     *
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to
     * @param message The log message.
     * @param data Any data that should be included.
     */
    notice(className: string, methodName: string, message: string, data?: object): void;
    /**
     * warn()
     *
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data Any data that should be included.
     */
    warn(className: string, methodName: string, message: string, data?: object): void;
    /**
     * error()
     *
     * @param className The class name the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */
    error(className: string, methodName: string, message: string, trace: string, data?: object): void;
    /**
     * crit()
     *
     * @param className The name of the class being referred to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */
    crit(className: string, methodName: string, message: string, trace: string, data?: object): void;
    /**
     * alert()
     *
     * @param className The class the log is referring to
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */
    alert(className: string, methodName: string, message: string, trace: string, data?: object): void;
    /**
     * emerg()
     *
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param trace The stack trace.
     * @param data Any data that should be included.
     */
    emerg(className: string, methodName: string, message: string, trace: string, data?: object): void;
    /**
     * setDelegate()
     *
     * setDelegate() sets the lot delegate.
     *
     * @param delegate The delegate to use.
     */
    setDelegate(delegate: LoggerDelegate): void;
}
//# sourceMappingURL=logger.d.ts.map