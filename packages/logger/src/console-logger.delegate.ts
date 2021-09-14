import { LogOptions, ErrorLogOptions } from "./log-options.interface";
import { LoggerDelegate } from "./logger-delegate";

/**
 * ConsoleLogger
 *
 * ConsoleLogger is a logger that prints to the console.
 */

export class ConsoleLoggerDelegate extends LoggerDelegate {
  constructor() {
    super();
  }

  /**
   * debug()
   *
   * @param message the log message
   * @param options log options
   */

  public debug(message: string, options: LogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * info()
   *
   * @param message the log message
   * @param options log options
   */

  public info(message: string, options: LogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * notice()
   *
   * @param message the log message
   * @param options log options
   */

  public notice(message: string, options: LogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * warn()
   *
   * @param message the log message
   * @param options log options
   */

  public warn(message: string, options: LogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * error()
   *
   * @param message the log message
   * @param options log options
   */

  public error(message: string, options: ErrorLogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * crit()
   *
   * @param message the log message
   * @param options log options
   */

  public crit(message: string, options: ErrorLogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * alert()
   *
   * @param message the log message
   * @param options log options
   */

  public alert(message: string, options: ErrorLogOptions): void {
    console.log(this.format(message, options));
  }

  /**
   * emerg()
   *
   * @param message the log message
   * @param options log options
   */

  public emerg(message: string, options: ErrorLogOptions): void {
    console.log(this.format(message, options));
  }

  private format(
    message: string,
    options: LogOptions | ErrorLogOptions = {}
  ): string {
    let msg = "";
    msg += options.className
      ? `[${options.className}${
          options.methodName ? "." + options.methodName : ""
        }]: `
      : "";
    msg += `${message} \n${options.data ? JSON.stringify(options.data) : ""}`;
    return msg;
  }
}
