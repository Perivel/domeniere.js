import { DependencyToken } from 'verdic';
import { ModuleEntryInterface } from "./module-entry.interface";

/**
 * ModuleInstanceEntry
 * 
 */

export class ModuleInstanceEntry<T> implements ModuleEntryInterface {

    private readonly _token: DependencyToken<T>;
    private  _instance: T|null;

    constructor(token: DependencyToken<T>, instance: T|null = null) {
        this._token = token;
        this._instance = instance;
    }

    /**
     * haInstance()
     * 
     * determines if the entry has a registered non-null instance.
     * @returns TRUE if the instance exists. FALSE otherwiese.
     */
    
    public hasInstance(): boolean {
        return this._instance != null;
    }

    /**
     * instance()
     * 
     * instance() gets the instance.
     * @returns the instance.
     */

    public instance(): T|null {
        return this._instance;
    }

    /**
     * token()
     * 
     * gets the entry's token.
     * @returns the dependency token.
     */

    public token(): DependencyToken<T> {
        return this._token;
    }

    /**
     * setInstance()
     * 
     * sets the instance of the entry.
     * @param instance the instance to set.
     */

    public setInstance(instance: T): void {
        this._instance = instance;
    }
}