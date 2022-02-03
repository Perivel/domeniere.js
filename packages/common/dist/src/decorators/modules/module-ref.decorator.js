"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRef = void 0;
/**
 * ModuleRef() Decorator.
 *
 * The ModuleRef() decorator creates a reference to a module from your Api.
 * This decorator should only be used within the Api class of your DomeniereJS project.
 */
function ModuleRef(path) {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            writable: false,
            enumerable: false,
            get: function () {
                return this.domain.module(path);
            },
        });
    };
}
exports.ModuleRef = ModuleRef;
//# sourceMappingURL=module-ref.decorator.js.map