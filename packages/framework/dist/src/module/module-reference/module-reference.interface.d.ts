import { DependencyToken } from '@swindle/container';
export interface ModuleReferenceInterface {
    /**
     * get()
     *
     * gets the instance of the specified dependency.
     * @param dependency The dependency to retrieve.
     */
    get<T>(dependency: DependencyToken<T>): T;
}
//# sourceMappingURL=module-reference.interface.d.ts.map