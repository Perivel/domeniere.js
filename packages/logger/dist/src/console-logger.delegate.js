"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLoggerDelegate = void 0;
const logger_delegate_1 = require("./logger-delegate");
/**
 * ConsoleLogger
 *
 * ConsoleLogger is a logger that prints to the console.
 */
class ConsoleLoggerDelegate extends logger_delegate_1.LoggerDelegate {
    constructor() {
        super();
    }
    /**
     * debug()
     *
     * @param message the log message
     * @param options log options
     */
    debug(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * info()
     *
     * @param message the log message
     * @param options log options
     */
    info(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * notice()
     *
     * @param message the log message
     * @param options log options
     */
    notice(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * warn()
     *
     * @param message the log message
     * @param options log options
     */
    warn(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * error()
     *
     * @param message the log message
     * @param options log options
     */
    error(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * crit()
     *
     * @param message the log message
     * @param options log options
     */
    crit(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * alert()
     *
     * @param message the log message
     * @param options log options
     */
    alert(message, options) {
        console.log(this.format(message, options));
    }
    /**
     * emerg()
     *
     * @param message the log message
     * @param options log options
     */
    emerg(message, options) {
        console.log(this.format(message, options));
    }
    format(message, options = {}) {
        let msg = "";
        msg += options.className
            ? `[${options.className}${options.methodName ? "." + options.methodName : ""}]: `
            : "";
        msg += `${message} \n${options.data ? JSON.stringify(options.data) : ""}`;
        return msg;
    }
}
exports.ConsoleLoggerDelegate = ConsoleLoggerDelegate;
//# sourceMappingURL=console-logger.delegate.js.map