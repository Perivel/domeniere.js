

export interface MessageFormatterInterface {

    /**
     * error()
     * 
     * formats an error message.
     * @param message the message to format.
     */

    error(message: string): string;

    /**
     * info()
     * 
     * formats an info message.
     * @param message the message to format.
     */
    
    info(message: string): string;
}