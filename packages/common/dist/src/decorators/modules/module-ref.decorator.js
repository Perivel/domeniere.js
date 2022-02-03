"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRef = void 0;
const framework_1 = require("@domeniere/framework");
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
                const module = this.domain.module(path);
                return new framework_1.ModuleReference(module);
            },
        });
    };
}
exports.ModuleRef = ModuleRef;
//# sourceMappingURL=module-ref.decorator.js.map