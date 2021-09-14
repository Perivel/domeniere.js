import { ErrorLogOptions, LogOptions } from "./log-options.interface";
/**
 * LoggerDelegate
 *
 * THe logger delegate.
 */
export declare abstract class LoggerDelegate {
    constructor();
    /**
     * debug()
     *
     * @param message the log message
     * @param options log options
     */
    abstract debug(message: string, options: LogOptions): void;
    /**
     * info()
     *
     * @param message the log message
     * @param options log options
     */
    abstract info(message: string, options: LogOptions): void;
    /**
     * notice()
     *
     * @param message the log message
     * @param options log options
     */
    abstract notice(message: string, options: LogOptions): void;
    /**
     * warn()
     *
     * @param message the log message
     * @param options log options
     */
    abstract warn(message: string, options: LogOptions): void;
    /**
     * error()
     *
     * @param message the log message
     * @param options log options
     */
    abstract error(message: string, options: ErrorLogOptions): void;
    /**
     * crit()
     *
     * @param message the log message
     * @param options log options
     */
    abstract crit(message: string, options: ErrorLogOptions): void;
    /**
     * alert()
     *
     * @param message the log message
     * @param options log options
     */
    abstract alert(message: string, options: ErrorLogOptions): void;
    /**
     * emerg()
     *
     * @param message the log message
     * @param options log options
     */
    abstract emerg(message: string, options: ErrorLogOptions): void;
}
//# sourceMappingURL=logger-delegate.d.ts.map