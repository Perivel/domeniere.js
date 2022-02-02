import { ConcreteDependencyToken, BindingFactory, DependencyToken } from '@swindle/container';
import { ModuleBindings } from '../types/module-bindings.type';
import { ModuleInstances } from '../types/module-instances.type';
import { ModuleInterface } from './module.interface';
/**
 * Module
 */
export declare abstract class Module implements ModuleInterface {
    private readonly _factoryBindings;
    private readonly _serviceBindings;
    private readonly _repositoryInstances;
    private readonly _serviceInstances;
    private readonly _path;
    constructor(path: string);
    /**
     * createBindings()
     *
     * this is where we register our module bindings.
     *
     * use bindFactory(), bindRepository(), bindService(), and bindServiceinstance()
     * to register module dependencies.
     */
    protected abstract createdBindings(): void;
    /**
     * factoryBindings()
     *
     * gets the module's factory bindings.
     */
    factoryBindings(): ModuleBindings;
    /**
     * path()
     *
     * gets the path of the module.
     */
    path(): string;
    /**
     * registerRepositoryInstance()
     *
     * registers a repository instance.
     * @param token The token to attach the instance to.
     * @param instance The instance to attach.
     * @throws RegistrationNotFoundException when there is no registration for the token
     */
    registerRepositoryInstance<T>(token: DependencyToken<T>, instance: T): void;
    /**
     * regosterServoceInstance()
     *
     * registerServiceInstance() registers a service instance.
     * @param token the token to attach the instance to.
     * @param instance The instance to register.
     * @throws RegistrationNotFoundException when the service cannot be found.
     */
    registerServiceInstance<T>(token: DependencyToken<T>, instance: T): void;
    /**
     * repositoryInstances()
     *
     * gets the repository instances.
     * @throws RegistrationNotFoundException when the registration token is not found
     * @throws RegistrationNotFoundException when there is a missing instance binding.
     */
    repositoryInstances(): ModuleInstances;
    /**
     * serviceBindings()
     *
     * gets the service bindings for the module.
     */
    serviceBindings(): ModuleBindings;
    /**
     * serviceInstances()
     *
     * gets the service instances.
     * @throws UndefinedInstanceBindingException
     */
    serviceInstances(): ModuleInstances;
    /**
     * bindFactory()
     *
     * adds a factory binding.
     * @param token the token
     * @param factory the factory.
     * @throw DuplicateBindingException when adding a duplicate binding.
     */
    protected bindFactory<T>(token: ConcreteDependencyToken<T>, factory: BindingFactory<T>): void;
    /**
     * bindRepository()
     *
     * adds a repository entry to the module.
     * @param token the token to bind the repository to.
     * @throw DuplicateBindingException when attempting to add a duplicate repository entry.
     */
    protected bindRepository<T>(token: DependencyToken<T>): void;
    /**
     * bindService()
     *
     * adds a service binding to the module.
     * @param token the token to bind the factory to.
     * @param factory the factory.
     */
    protected bindService<T>(token: ConcreteDependencyToken<T>, factory: BindingFactory<T>): void;
    /**
     * bindServiceInstance()
     *
     * adds a service instance to the module.
     * @param token the token to register.
     * @throws DuplicateBindingException when attempting to register a service that already exists.
     *
     */
    protected bindServiceInstance<T>(token: DependencyToken<T>): void;
    /**
     * getIdFromToken()
     *
     * getIdFromToken() gets the id for a token.
     * @param token the token to derrive the name from
     * @returns the id of the token.
     */
    private getIdFromToken;
}
//# sourceMappingURL=module.d.ts.map