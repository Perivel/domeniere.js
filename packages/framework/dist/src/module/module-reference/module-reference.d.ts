import { Container, DependencyToken } from '@swindle/container';
import { ModuleReferenceInterface } from './module-reference.interface';
/**
 * ModuleReference
 *
 * A Module Reference represents a reference to a module.
 */
export declare class ModuleReference implements ModuleReferenceInterface {
    private readonly source;
    constructor(src: Container);
    /**
     * get()
     *
     * gets the instance of the specified dependency.
     * @param dependency The dependency to retrieve.
     */
    get<T>(dependency: DependencyToken<T>): T;
}
//# sourceMappingURL=module-reference.d.ts.map