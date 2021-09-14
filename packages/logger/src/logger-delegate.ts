import { 
    ErrorLogOptions, 
    LogOptions 
} from "./log-options.interface";

/**
 * LoggerDelegate
 * 
 * THe logger delegate.
 */


export abstract class LoggerDelegate {

    constructor() {
        //
    }

    /**
     * debug()
     * 
     * @param message the log message
     * @param options log options
     */

     public abstract debug(message: string, options: LogOptions): void;

     /**
      * info()
      * 
      * @param message the log message
      * @param options log options
      */
 
     public abstract info(message: string, options: LogOptions): void;
 
     /**
      * notice()
      * 
      * @param message the log message
      * @param options log options
      */
 
     public abstract notice(message: string, options: LogOptions): void;
 
     /**
      * warn()
      * 
      * @param message the log message
      * @param options log options
      */
 
     public abstract warn(message: string, options: LogOptions): void;
 
     /**
      * error()
      * 
      * @param message the log message
      * @param options log options
      */
 
     public abstract error(message: string, options: ErrorLogOptions): void;
 
     /**
      * crit()
      * 
      * @param message the log message
      * @param options log options
      */
 
     public abstract crit(message: string, options: ErrorLogOptions): void;
 
     /**
      * alert()
      * 
      * @param message the log message
      * @param options log options
      */
 
     public abstract alert(message: string, options: ErrorLogOptions): void;
 
     /**
      * emerg()
      * 
      * @param message the log message
      * @param options log options
      */
     
     public abstract emerg(message: string, options: ErrorLogOptions): void;
}