"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const console_logger_delegate_1 = require("./console-logger.delegate");
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
    debug(className, methodName, message, data = {}) {
        this.delegate.debug(className, methodName, message, data);
    }
    info(className, methodName, message, data = {}) {
        this.delegate.info(className, methodName, message, data);
    }
    notice(className, methodName, message, data = {}) {
        this.delegate.notice(className, methodName, message, data);
    }
    warn(className, methodName, message, data = {}) {
        this.delegate.warn(className, methodName, message, data);
    }
    error(className, methodName, message, trace, data = {}) {
        this.delegate.error(className, methodName, message, trace, data);
    }
    crit(className, methodName, message, trace, data = {}) {
        this.delegate.crit(className, methodName, message, trace, data);
    }
    alert(className, methodName, message, trace, data = {}) {
        this.delegate.alert(className, methodName, message, trace, data);
    }
    emerg(className, methodName, message, trace, data = {}) {
        this.delegate.emerg(className, methodName, message, trace, data);
    }
    setDelegate(delegate) {
        this.delegate = delegate;
    }
}
exports.Logger = Logger;
