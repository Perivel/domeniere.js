export declare abstract class LoggerDelegate {
    constructor();
    abstract debug(className: string, methodName: string, message: string, data: object): void;
    abstract info(className: string, methodName: string, message: string, data: object): void;
    abstract notice(className: string, methodName: string, message: string, data: object): void;
    abstract warn(className: string, methodName: string, message: string, data: object): void;
    abstract error(className: string, methodName: string, message: string, trace: string, data: object): void;
    abstract crit(className: string, methodName: string, message: string, trace: string, data: object): void;
    abstract alert(className: string, methodName: string, message: string, trace: string, data: object): void;
    abstract emerg(className: string, methodName: string, message: string, trace: string, data: object): void;
}
//# sourceMappingURL=logger-delegate.d.ts.map