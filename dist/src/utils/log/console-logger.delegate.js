"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLoggerDelegate = void 0;
const logger_delegate_1 = require("./logger-delegate");
/**
 * ConsoleLoggerDelegateService
 *
 * ConsoleLoggerDelegateService is a console logger service.
 */
class ConsoleLoggerDelegate extends logger_delegate_1.LoggerDelegate {
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
    debug(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    /**
     * indo()
     *
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */
    info(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    /**
     * notice()
     *
     * @param className The name of the class the log is referring to.
     * @param methodName The method the log is referring to
     * @param message The log message.
     * @param data any data to be included.
     */
    notice(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    /**
     * warn()
     *
     * @param className The class the log is referring to.
     * @param methodName The method the log is referring to.
     * @param message The log message.
     * @param data any data to be included.
     */
    warn(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
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
    error(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
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
    crit(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
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
    alert(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
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
    emerg(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
    }
    format(className, methodName, message, trace = '', data = {}) {
        let msg = `[${className}.${methodName}]: ${message}`;
        msg = msg + "\ndata: " + JSON.stringify(data);
        return (trace) ? msg + '\n' + trace : msg;
    }
}
exports.ConsoleLoggerDelegate = ConsoleLoggerDelegate;
