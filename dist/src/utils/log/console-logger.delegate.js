import { LoggerDelegate } from './logger-delegate';
export class ConsoleLoggerDelegate extends LoggerDelegate {
    constructor() {
        super();
    }
    debug(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    info(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    notice(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    warn(className, methodName, message, data = {}) {
        console.log(this.format(className, methodName, message, '', data));
    }
    error(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
    }
    crit(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
    }
    alert(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
    }
    emerg(className, methodName, message, trace, data = {}) {
        console.log(this.format(className, methodName, message, trace, data));
    }
    format(className, methodName, message, trace = '', data = {}) {
        let msg = `[${className}.${methodName}]: ${message}`;
        msg = msg + "\ndata: " + JSON.stringify(data);
        return (trace) ? msg + '\n' + trace : msg;
    }
}
