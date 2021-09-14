import { StateInterface } from "./state.interface";
/**
 * State
 *
 * A class to manage the object state for some object.
 */
export declare class State implements StateInterface {
    private readonly traces;
    private readonly modifiedTraces;
    constructor();
    /**
     * confirmChanges()
     *
     * Confirms and finalizes the changes to the state.
     */
    confirmChanges(): void;
    /**
     * contains()
     *
     * determines if the state contains the provided key
     * @param key
     */
    contains(key: string): boolean;
    /**
     * discardChanges()
     *
     * discards any changes made and reverts the state.
     */
    discardChanges(): void;
    /**
     * get()
     *
     * gets the state value for te given key.
     * @param key the key of the state value to get.
     * @throws UndefinedStateException when the state you are retrieving is not found.
     */
    get<T>(key: string): T;
    /**
     * initialize()
     *
     * Initializes a new state value.
     * @param key the key to initialize
     * @param value the initial value to set.
     * @throws DuplicateStateInstantiationException when attempting to initialize an already initialized steate.
     */
    initialize<T>(key: string, value: T): void;
    /**
     * set()
     *
     * updates the current state value with the given key.
     * @param key the key to set.
     * @param value the value to set.
     * @throws UndefinedStateException when the key of the state beting set is not initialized.
     */
    set<T>(key: string, value: T): void;
}
//# sourceMappingURL=state.d.ts.map