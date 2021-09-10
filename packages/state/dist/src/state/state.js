"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const exceptions_well_1 = require("../exceptions/exceptions.well");
const trace_well_1 = require("../trace/trace.well");
/**
 * State
 *
 * A class to manage the object state for some object.
 */
class State {
    constructor() {
        this.traces = new Map();
        this.modifiedTraces = [];
    }
    /**
     * confirmChanges()
     *
     * Confirms and finalizes the changes to the state.
     */
    confirmChanges() {
        this.modifiedTraces.forEach(key => this.traces.get(key).confirm());
        this.modifiedTraces.splice(0, this.modifiedTraces.length);
    }
    /**
     * discardChanges()
     *
     * discards any changes made and reverts the state.
     */
    discardChanges() {
        this.modifiedTraces.forEach(key => this.traces.get(key).discard());
        this.modifiedTraces.splice(0, this.modifiedTraces.length);
    }
    /**
     * get()
     *
     * gets the state value for te given key.
     * @param key the key of the state value to get.
     * @throws UndefinedStateException when the state you are retrieving is not found.
     */
    get(key) {
        if (this.traces.has(key)) {
            return this.traces.get(key).get();
        }
        else {
            throw new exceptions_well_1.UndefinedStateException(`Undefined state '${key}'`);
        }
    }
    /**
     * initialize()
     *
     * Initializes a new state value.
     * @param key the key to initialize
     * @param value the initial value to set.
     * @throws DuplicateStateInstantiationException when attempting to initialize an already initialized steate.
     */
    initialize(key, value) {
        if (!this.traces.has(key)) {
            this.traces.set(key, new trace_well_1.Trace(value));
        }
        else {
            throw new exceptions_well_1.DuplicateStateInitializationException(`Attempting to redefine state '${key}'`);
        }
    }
    /**
     * set()
     *
     * updates the current state value with the given key.
     * @param key the key to set.
     * @param value the value to set.
     * @throws UndefinedStateException when the key of the state beting set is not initialized.
     */
    set(key, value) {
        var _a;
        if (this.traces.has(key)) {
            (_a = this.traces.get(key)) === null || _a === void 0 ? void 0 : _a.set(value);
            this.modifiedTraces.push(key);
        }
        else {
            throw new exceptions_well_1.UndefinedStateException(`Undefined state '${key}'`);
        }
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map