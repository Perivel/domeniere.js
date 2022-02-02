export interface SpinnerInterface {
    /**
     * start()
     *
     * Stats the spinner with the provided message.
     * @param message the message to display.
     */
    start(message: string): void;
    /**
     * stopWithFailure()
     *
     * stops the spinner with the message in failed state..
     * @param message the message to display.
     */
    stopWithFailure(message: string): void;
    /**
     * stopWithSuccess()
     *
     * stops the spinner with the message in successful state..
     * @param message the message to display.
     */
    stopWithSuccess(message: string): void;
}
//# sourceMappingURL=spinner.interface.d.ts.map