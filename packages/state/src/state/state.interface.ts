

export interface StateInterface {

    /**
     * confirmChanges()
     * 
     * Confirms and finalizes the changes to the state.
     */

    confirmChanges(): void;

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
     */

    get<T>(key: string): T;

    /**
     * initialize()
     * 
     * Initializes a new state value.
     * @param key the key to initialize
     * @param value the initial value to set.
     */

    initialize<T>(key: string, value: T): void;

    /**
     * set()
     * 
     * updates the current state value with the given key.
     * @param key the key to set.
     * @param value the value to set.
     */

    set<T>(key: string, value: T): void
}