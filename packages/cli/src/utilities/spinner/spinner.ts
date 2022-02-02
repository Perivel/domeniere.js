import Ora from "ora";
import { SpinnerInterface } from "./spinner.interface";

/**
 * Spinner
 * 
 * The spinner.
 */

export class Spinner implements SpinnerInterface {

    private spinner: Ora.Ora|null;

    constructor() {
        this.spinner = null;
    }

    /**
     * start()
     * 
     * Stats the spinner with the provided message.
     * @param message the message to display.
     */

    public start(message: string): void {
        this.spinner = Ora({}).start(message);
    }

    /**
     * stopWithFailure()
     * 
     * stops the spinner with the message in failed state..
     * @param message the message to display.
     */

    public stopWithFailure(message: string): void {
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

    public stopWithSuccess(message: string): void {
        if (this.spinner !== null) {
            this.spinner = this.spinner.succeed(message);
            this.spinner = null;
        }
    }
}