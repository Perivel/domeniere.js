import { ConcreteDependencyToken, BindingFactory } from 'verdic';
import { ModuleEntryInterface } from "./module-entry.interface";

/**
 * ModuleFactoryEntry
 */

export class ModuleFactoryEntry<T> implements ModuleEntryInterface {

    private readonly _token: ConcreteDependencyToken<T>;
    private readonly _factory: BindingFactory<T>;

    constructor(token: ConcreteDependencyToken<T>, factory: BindingFactory<T>) {
        this._token = token;
        this._factory = factory;
    }

    /**
     * factory()
     * 
     * gets the factory function.
     * @returns the factory.
     */

    public factory(): BindingFactory<T> {
        return this._factory;
    }

    /**
     * token()
     * 
     * token() gets the token.
     * @returns the dependency token.
     */

    public token(): ConcreteDependencyToken<T> {
        return this._token;
    }
}