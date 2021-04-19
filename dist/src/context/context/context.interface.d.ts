import { Dependency } from 'foundation';
/**
 * ContextInterface
 *
 * ContextInterface specifies the operatons of the context.
 */
export interface ContextInterface {
    /**
     * get()
     *
     * get() gets the instance of the given type from the context.
     * @param type the type of the dependency to get.
     */
    get<T>(service: Dependency<T>): T;
    /**
     * has()
     *
     * has() determines if the context has the specified service.
     * @param service The type of the instance to get.
     */
    has<T>(service: Dependency<T>): boolean;
    /**
     * registerInstance()
     *
     * registerInstance() adds a given instance to the context.
     * @param service The type of the service to add.
     * @param instance the instance to add.
     */
    registerInstance<T>(service: Dependency<T>, instance: T): void;
}
//# sourceMappingURL=context.interface.d.ts.map