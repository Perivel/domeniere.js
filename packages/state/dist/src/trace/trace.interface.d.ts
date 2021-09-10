export interface TraceInterface<T> {
    /**
     * confirm()
     *
     * confirms the trace changes.
     */
    confirm(): void;
    /**
     * discard()
     *
     * discards the changes
     */
    discard(): void;
    /**
     * get()
     *
     * gets the value of the trace.
     */
    get(): T;
    /**
     * set()
     *
     * sets the value of the trace.
     * @param value the value to set.
     */
    set(value: T): void;
}
//# sourceMappingURL=trace.interface.d.ts.map