"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleReference = void 0;
/**
 * ModuleReference
 *
 * A Module Reference represents a reference to a module.
 */
class ModuleReference {
    constructor(src) {
        this.source = src;
    }
    /**
     * get()
     *
     * gets the instance of the specified dependency.
     * @param dependency The dependency to retrieve.
     */
    get(dependency) {
        return this.source.get(dependency);
    }
}
exports.ModuleReference = ModuleReference;
//# sourceMappingURL=module-reference.js.map