"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const ora_1 = __importDefault(require("ora"));
/**
 * Spinner
 *
 * The spinner.
 */
class Spinner {
    constructor() {
        this.spinner = null;
    }
    /**
     * start()
     *
     * Stats the spinner with the provided message.
     * @param message the message to display.
     */
    start(message) {
        this.spinner = (0, ora_1.default)({}).start(message);
    }
    /**
     * stopWithFailure()
     *
     * stops the spinner with the message in failed state..
     * @param message the message to display.
     */
    stopWithFailure(message) {
        if (this.spinner !== null) {
            this.spinner = this.spinner.fail(message);
            this.spinner = null;
        }
    }
    /**
     * stopWithSuccess()
     *
     * stops the spinner with the message in successful state..
     * @param message the message to display.
     */
    stopWithSuccess(message) {
        if (this.spinner !== null) {
            this.spinner = this.spinner.succeed(message);
            this.spinner = null;
        }
    }
}
exports.Spinner = Spinner;
