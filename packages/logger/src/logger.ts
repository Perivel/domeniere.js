import { ConsoleLoggerDelegate } from "./console-logger.delegate";
import { LogOptions, ErrorLogOptions } from "./log-options.interface";
import { LoggerDelegate } from "./logger-delegate";


/**
 * Logger
 *
 * Logger is the core log module.
 */

export class Logger {

  private static Instance: Logger|null;
  private delegate: LoggerDelegate;

  private constructor() {
    this.delegate = new ConsoleLoggerDelegate();
  }

  /**
   * debug()
   *
   * @param message the log message
   * @param options log options
   */

  public static debug(message: string, options: LogOptions): void {
      Logger.instance().delegate.debug(message, options);
  }

  /**
   * info()
   *
   * @param message the log message
   * @param options log options
   */

  public static info(message: string, options: LogOptions): void {
    Logger.instance().delegate.info(message, options);
  }

  /**
   * notice()
   *
   * @param message the log message
   * @param options log options
   */

  public static notice(message: string, options: LogOptions): void {
    Logger.instance().delegate.notice(message, options);
  }

  /**
   * warn()
   *
   * @param message the log message
   * @param options log options
   */

  public static warn(message: string, options: LogOptions): void {
    Logger.instance().delegate.warn(message, options);
  }

  /**
   * error()
   *
   * @param message the log message
   * @param options log options
   */

  public static error(message: string, options: ErrorLogOptions): void {
    Logger.instance().delegate.error(message, options);
  }

  /**
   * crit()
   *
   * @param message the log message
   * @param options log options
   */

  public static crit(message: string, options: ErrorLogOptions): void {
    Logger.instance().delegate.crit(message, options);
  }

  /**
   * alert()
   *
   * @param message the log message
   * @param options log options
   */

  public static alert(message: string, options: ErrorLogOptions): void {
    Logger.instance().delegate.alert(message, options);
  }

  /**
   * emerg()
   *
   * @param message the log message
   * @param options log options
   */

  public static emerg(message: string, options: ErrorLogOptions): void {
    Logger.instance().delegate.emerg(message, options);
  }

  public static setDelegate(delegate: LoggerDelegate): void {
    Logger.instance().delegate = delegate;
  }

  /**
   * instance()
   * 
   * gets the instance.
   * @returns Logger.
   */

  private static instance(): Logger {
      if (!Logger.Instance) {
        Logger.Instance = new Logger();
      }

      return Logger.Instance;
  }
}
