"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormatter = void 0;
const chalk_1 = require("chalk");
/**
 * MessageFormatter
 *
 * Formats an output message.
 */
class MessageFormatter {
    constructor() {
        //
    }
    /**
     * error()
     *
     * formats an error message.
     * @param message the message to format.
     */
    error(message) {
        return (0, chalk_1.red)(`Error: ${message}`);
    }
    /**
     * info()
     *
     * formats an info message.
     * @param message the message to format.
     */
    info(message) {
        return (0, chalk_1.green)(message);
    }
}
exports.MessageFormatter = MessageFormatter;
