"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const console_logger_delegate_1 = require("./console-logger.delegate");
/**
 * Logger
 *
 * Logger is the core log module.
 */
class Logger {
    constructor() {
        this.delegate = new console_logger_delegate_1.ConsoleLoggerDelegate();
    }
    static instance() {
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
    debug(className, methodName, message, data = {}) {
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
    info(className, methodName, message, data = {}) {
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
    notice(className, methodName, message, data = {}) {
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
    warn(className, methodName, message, data = {}) {
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
    error(className, methodName, message, trace, data = {}) {
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
    crit(className, methodName, message, trace, data = {}) {
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
    alert(className, methodName, message, trace, data = {}) {
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
    emerg(className, methodName, message, trace, data = {}) {
        this.delegate.emerg(className, methodName, message, trace, data);
    }
    /**
     * setDelegate()
     *
     * setDelegate() sets the lot delegate.
     *
     * @param delegate The delegate to use.
     */
    setDelegate(delegate) {
        this.delegate = delegate;
    }
}
exports.Logger = Logger;
