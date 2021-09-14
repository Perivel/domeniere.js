import { LogOptions, ErrorLogOptions } from "./log-options.interface";
import { LoggerDelegate } from "./logger-delegate";
/**
 * Logger
 *
 * Logger is the core log module.
 */
export declare class Logger {
    private static Instance;
    private delegate;
    private constructor();
    /**
     * debug()
     *
     * @param message the log message
     * @param options log options
     */
    static debug(message: string, options: LogOptions): void;
    /**
     * info()
     *
     * @param message the log message
     * @param options log options
     */
    static info(message: string, options: LogOptions): void;
    /**
     * notice()
     *
     * @param message the log message
     * @param options log options
     */
    static notice(message: string, options: LogOptions): void;
    /**
     * warn()
     *
     * @param message the log message
     * @param options log options
     */
    static warn(message: string, options: LogOptions): void;
    /**
     * error()
     *
     * @param message the log message
     * @param options log options
     */
    static error(message: string, options: ErrorLogOptions): void;
    /**
     * crit()
     *
     * @param message the log message
     * @param options log options
     */
    static crit(message: string, options: ErrorLogOptions): void;
    /**
     * alert()
     *
     * @param message the log message
     * @param options log options
     */
    static alert(message: string, options: ErrorLogOptions): void;
    /**
     * emerg()
     *
     * @param message the log message
     * @param options log options
     */
    static emerg(message: string, options: ErrorLogOptions): void;
    static setDelegate(delegate: LoggerDelegate): void;
    /**
     * instance()
     *
     * gets the instance.
     * @returns Logger.
     */
    private static instance;
}
//# sourceMappingURL=logger.d.ts.map