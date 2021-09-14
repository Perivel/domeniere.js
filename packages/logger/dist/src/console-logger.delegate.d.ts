import { LogOptions, ErrorLogOptions } from "./log-options.interface";
import { LoggerDelegate } from "./logger-delegate";
/**
 * ConsoleLogger
 *
 * ConsoleLogger is a logger that prints to the console.
 */
export declare class ConsoleLoggerDelegate extends LoggerDelegate {
    constructor();
    /**
     * debug()
     *
     * @param message the log message
     * @param options log options
     */
    debug(message: string, options: LogOptions): void;
    /**
     * info()
     *
     * @param message the log message
     * @param options log options
     */
    info(message: string, options: LogOptions): void;
    /**
     * notice()
     *
     * @param message the log message
     * @param options log options
     */
    notice(message: string, options: LogOptions): void;
    /**
     * warn()
     *
     * @param message the log message
     * @param options log options
     */
    warn(message: string, options: LogOptions): void;
    /**
     * error()
     *
     * @param message the log message
     * @param options log options
     */
    error(message: string, options: ErrorLogOptions): void;
    /**
     * crit()
     *
     * @param message the log message
     * @param options log options
     */
    crit(message: string, options: ErrorLogOptions): void;
    /**
     * alert()
     *
     * @param message the log message
     * @param options log options
     */
    alert(message: string, options: ErrorLogOptions): void;
    /**
     * emerg()
     *
     * @param message the log message
     * @param options log options
     */
    emerg(message: string, options: ErrorLogOptions): void;
    private format;
}
//# sourceMappingURL=console-logger.delegate.d.ts.map