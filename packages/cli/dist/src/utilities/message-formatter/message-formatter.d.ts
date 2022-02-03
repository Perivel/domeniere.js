import { MessageFormatterInterface } from "./message-formatter.interface";
/**
 * MessageFormatter
 *
 * Formats an output message.
 */
export declare class MessageFormatter implements MessageFormatterInterface {
    constructor();
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
//# sourceMappingURL=message-formatter.d.ts.map