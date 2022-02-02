import { ConcreteDependencyToken, BindingFactory } from '@swindle/container';
import { ModuleEntryInterface } from "./module-entry.interface";
/**
 * ModuleFactoryEntry
 */
export declare class ModuleFactoryEntry<T> implements ModuleEntryInterface {
    private readonly _token;
    private readonly _factory;
    constructor(token: ConcreteDependencyToken<T>, factory: BindingFactory<T>);
    /**
     * factory()
     *
     * gets the factory function.
     * @returns the factory.
     */
    factory(): BindingFactory<T>;
    /**
     * token()
     *
     * token() gets the token.
     * @returns the dependency token.
     */
    token(): ConcreteDependencyToken<T>;
}
//# sourceMappingURL=module-factory-entry.d.ts.map