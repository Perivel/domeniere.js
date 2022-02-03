import { red, green } from "chalk";
import { MessageFormatterInterface } from "./message-formatter.interface";

/**
 * MessageFormatter
 * 
 * Formats an output message.
 */

export class MessageFormatter implements MessageFormatterInterface {

    constructor() {
        //
    }

    /**
     * error()
     * 
     * formats an error message.
     * @param message the message to format.
     */

    public error(message: string): string {
        return red(`Error: ${message}`);
    }

    /**
     * info()
     * 
     * formats an info message.
     * @param message the message to format.
     */

    public info(message: string): string {
        return green(message);
    }
}