"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trace = void 0;
/**
 * Trace
 *
 * A class to manage state changes.
 */
class Trace {
    constructor(initialValue) {
        this.value = initialValue;
        this.candidate = initialValue;
        this.hasCandidate = false;
    }
    /**
     * confirm()
     *
     * confirms the trace changes.
     */
    confirm() {
        this.value = this.candidate;
        this.hasCandidate = false;
    }
    /**
     * discard()
     *
     * discards the changes
     */
    discard() {
        this.hasCandidate = false;
    }
    /**
     * get()
     *
     * gets the value of the trace.
     */
    get() {
        if (this.hasCandidate) {
            return this.candidate;
        }
        else {
            return this.value;
        }
    }
    /**
     * set()
     *
     * sets the value of the trace.
     * @param value the value to set.
     */
    set(value) {
        this.candidate = value;
        this.hasCandidate = true;
    }
}
exports.Trace = Trace;
//# sourceMappingURL=trace.js.map