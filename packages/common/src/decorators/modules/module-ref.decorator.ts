import { Api, ModuleReference } from "@domeniere/framework";

/**
 * ModuleRef() Decorator.
 *
 * The ModuleRef() decorator creates a reference to a module from your Api.
 * This decorator should only be used within the Api class of your DomeniereJS project.
 */

export function ModuleRef(path: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            writable: false,
            enumerable: false,
            get: function () {
                const module = (this as Api).domain.module(path);
                return new ModuleReference(module);
            },
        });
    }
}