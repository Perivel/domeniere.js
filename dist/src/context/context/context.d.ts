import { Dependency } from 'foundation';
import { ContextInterface } from "./context.interface";
/**
 * Context
 *
 * Context is the Bounded Context.
 */
export declare class Context implements ContextInterface {
    private static _instance;
    private readonly container;
    private constructor();
    /**
     * instance()
     *
     * instance() gets the instance of the context.
     * @returns the instance of the context.
     */
    static instance(): Context;
    /**
     * Get()
     *
     * A convenience method to get the context service of the specified type.
     * @param service the service to get.
     * @returns the service to get.
     * @throws ServiceNotFoundException when the service cannot be found.
     */
    static Get<T>(service: Dependency<T>): T;
    /**
     * Has()
     *
     * a convenience method to determine if the context contains the specified service.
     * @param service The type of the service to get.
     * @returns TRUE if the context contains the service. FALSE otherwise.
     */
    static Has<T>(service: Dependency<T>): boolean;
    /**
     * RegisterInstance()
     *
     * a convenience method to register instances to the context.
     * @param service the service to register.
     * @param instance the instnace of the service to link.
     * @throws DuplicateServiceRegistrationException when attempting
     * to register a duplicate service.
     */
    static RegisterInstance<T>(service: Dependency<T>, instance: T): void;
    /**
     * get()
     *
     * get() gets the instance of the given type from the context.
     * @param service the service type to get.
     * @throws ServiceNotFoundException when the service cannot be found.
     */
    get<T>(service: Dependency<T>): T;
    /**
     * has()
     *
     * has() determines if the context has the specified service.
     * @param service The type of the service to check.
     */
    has<T>(service: Dependency<T>): boolean;
    /**
     * registerInstance()
     *
     * registerInstance() adds a given instance to the context.
     * @param service The type of the service to add.
     * @param instance the instance to add.
     * @throws DuplicateServiceRegistrationException when attempting
     * to register a duplicate service.
     */
    registerInstance<T>(service: Dependency<T>, instance: T): void;
}
//# sourceMappingURL=context.d.ts.map