import { LoggerDelegate } from './logger-delegate';
export declare class Logger {
    private static _instance;
    private delegate;
    constructor();
    static instance(): Logger;
    debug(className: string, methodName: string, message: string, data?: object): void;
    info(className: string, methodName: string, message: string, data?: object): void;
    notice(className: string, methodName: string, message: string, data?: object): void;
    warn(className: string, methodName: string, message: string, data?: object): void;
    error(className: string, methodName: string, message: string, trace: string, data?: object): void;
    crit(className: string, methodName: string, message: string, trace: string, data?: object): void;
    alert(className: string, methodName: string, message: string, trace: string, data?: object): void;
    emerg(className: string, methodName: string, message: string, trace: string, data?: object): void;
    setDelegate(delegate: LoggerDelegate): void;
}
//# sourceMappingURL=logger.d.ts.map