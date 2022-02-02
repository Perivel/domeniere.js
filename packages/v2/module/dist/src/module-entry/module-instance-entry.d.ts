import { DependencyToken } from '@swindle/container';
import { ModuleEntryInterface } from "./module-entry.interface";
/**
 * ModuleInstanceEntry
 *
 */
export declare class ModuleInstanceEntry<T> implements ModuleEntryInterface {
    private readonly _token;
    private _instance;
    constructor(token: DependencyToken<T>, instance?: T | null);
    /**
     * haInstance()
     *
     * determines if the entry has a registered non-null instance.
     * @returns TRUE if the instance exists. FALSE otherwiese.
     */
    hasInstance(): boolean;
    /**
     * instance()
     *
     * instance() gets the instance.
     * @returns the instance.
     */
    instance(): T | null;
    /**
     * token()
     *
     * gets the entry's token.
     * @returns the dependency token.
     */
    token(): DependencyToken<T>;
    /**
     * setInstance()
     *
     * sets the instance of the entry.
     * @param instance the instance to set.
     */
    setInstance(instance: T): void;
}
//# sourceMappingURL=module-instance-entry.d.ts.map