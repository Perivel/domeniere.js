import { LoggerDelegate } from './logger-delegate';
export declare class ConsoleLoggerDelegate extends LoggerDelegate {
    constructor();
    debug(className: string, methodName: string, message: string, data?: object): void;
    info(className: string, methodName: string, message: string, data?: object): void;
    notice(className: string, methodName: string, message: string, data?: object): void;
    warn(className: string, methodName: string, message: string, data?: object): void;
    error(className: string, methodName: string, message: string, trace: string, data?: object): void;
    crit(className: string, methodName: string, message: string, trace: string, data?: object): void;
    alert(className: string, methodName: string, message: string, trace: string, data?: object): void;
    emerg(className: string, methodName: string, message: string, trace: string, data?: object): void;
    private format;
}
//# sourceMappingURL=console-logger.delegate.d.ts.map