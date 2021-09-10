import { TraceInterface } from "./trace.interface";
/**
 * Trace
 *
 * A class to manage state changes.
 */
export declare class Trace<T> implements TraceInterface<T> {
    private value;
    private candidate;
    private hasCandidate;
    constructor(initialValue: T);
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
//# sourceMappingURL=trace.d.ts.map