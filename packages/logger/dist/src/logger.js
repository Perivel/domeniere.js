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
    /**
     * debug()
     *
     * @param message the log message
     * @param options log options
     */
    static debug(message, options) {
        Logger.instance().delegate.debug(message, options);
    }
    /**
     * info()
     *
     * @param message the log message
     * @param options log options
     */
    static info(message, options) {
        Logger.instance().delegate.info(message, options);
    }
    /**
     * notice()
     *
     * @param message the log message
     * @param options log options
     */
    static notice(message, options) {
        Logger.instance().delegate.notice(message, options);
    }
    /**
     * warn()
     *
     * @param message the log message
     * @param options log options
     */
    static warn(message, options) {
        Logger.instance().delegate.warn(message, options);
    }
    /**
     * error()
     *
     * @param message the log message
     * @param options log options
     */
    static error(message, options) {
        Logger.instance().delegate.error(message, options);
    }
    /**
     * crit()
     *
     * @param message the log message
     * @param options log options
     */
    static crit(message, options) {
        Logger.instance().delegate.crit(message, options);
    }
    /**
     * alert()
     *
     * @param message the log message
     * @param options log options
     */
    static alert(message, options) {
        Logger.instance().delegate.alert(message, options);
    }
    /**
     * emerg()
     *
     * @param message the log message
     * @param options log options
     */
    static emerg(message, options) {
        Logger.instance().delegate.emerg(message, options);
    }
    static setDelegate(delegate) {
        Logger.instance().delegate = delegate;
    }
    /**
     * instance()
     *
     * gets the instance.
     * @returns Logger.
     */
    static instance() {
        if (!Logger.Instance) {
            Logger.Instance = new Logger();
        }
        return Logger.Instance;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map