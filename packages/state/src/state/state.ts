import { 
    DuplicateStateInitializationException, 
    UndefinedStateException 
} from "../exceptions/exceptions.well";
import { Trace } from "../trace/trace.well";
import { StateInterface } from "./state.interface";

/**
 * State
 * 
 * A class to manage the object state for some object.
 */

export class State implements StateInterface {

    private readonly traces: Map<string, Trace<any>>;
    private readonly modifiedTraces: string[];

    constructor() {
        this.traces = new Map<string, Trace<any>>();
        this.modifiedTraces = [];
    }

    /**
     * confirmChanges()
     * 
     * Confirms and finalizes the changes to the state.
     */

    public confirmChanges(): void {
        this.modifiedTraces.forEach(key => this.traces.get(key)!.confirm());
        this.modifiedTraces.splice(0, this.modifiedTraces.length);
    }

     /**
      * discardChanges()
      * 
      * discards any changes made and reverts the state.
      */
 
    public discardChanges(): void {
        this.modifiedTraces.forEach(key => this.traces.get(key)!.discard());
        this.modifiedTraces.splice(0, this.modifiedTraces.length);
    }
 
     /**
      * get()
      * 
      * gets the state value for te given key.
      * @param key the key of the state value to get.
      * @throws UndefinedStateException when the state you are retrieving is not found.
      */
 
    public get<T>(key: string): T {
        if (this.traces.has(key)) {
            return this.traces.get(key)!.get();
        }
        else {
            throw new UndefinedStateException(`Undefined state '${key}'`);
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
 
    public initialize<T>(key: string, value: T): void {
        if (!this.traces.has(key)) {
            this.traces.set(key, new Trace<T>(value));
        }
        else {
            throw new DuplicateStateInitializationException(`Attempting to redefine state '${key}'`);
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
 
    public set<T>(key: string, value: T): void {
        if (this.traces.has(key)) {
            this.traces.get(key)?.set(value);
            this.modifiedTraces.push(key);
        }
        else {
            throw new UndefinedStateException(`Undefined state '${key}'`);
        }
    }
}