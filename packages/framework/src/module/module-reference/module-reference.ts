import { Container, DependencyToken } from '@swindle/container';
import { ModuleReferenceInterface } from './module-reference.interface';

/**
 * ModuleReference
 * 
 * A Module Reference represents a reference to a module.
 */

export class ModuleReference implements ModuleReferenceInterface {

    private readonly source: Container;

    constructor(src: Container) {
        this.source = src;
    }

    /**
     * get()
     * 
     * gets the instance of the specified dependency.
     * @param dependency The dependency to retrieve.
     */
    
    public get<T>(dependency: DependencyToken<T>): T {
        return this.source.get(dependency);
    }
}