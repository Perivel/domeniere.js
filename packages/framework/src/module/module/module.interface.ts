import { DependencyToken } from '@swindle/container';
import { Repository } from '@domeniere/repository';
import { DomainService } from '@domeniere/service';
import { ModuleBindings } from "../types/module-bindings.type";
import { ModuleInstances } from "../types/module-instances.type";

/**
 * ModuleInterface
 */

export interface ModuleInterface {

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
     */

    registerRepositoryInstance<T extends Repository>(token: DependencyToken<T>, instance: T): void;

    /**
     * regosterServoceInstance()
     * 
     * registerServiceInstance() registers a service instance.
     * @param token the token to attach the instance to.
     * @param instance The instance to register.
     */

    registerServiceInstance<T extends DomainService>(token: DependencyToken<T>, instance: T): void;

    /**
     * repositoryInstances()
     * 
     * gets the repository instances.
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
     */

    serviceInstances(): ModuleInstances;
}