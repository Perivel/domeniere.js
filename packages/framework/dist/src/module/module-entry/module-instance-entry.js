"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleInstanceEntry = void 0;
/**
 * ModuleInstanceEntry
 *
 */
class ModuleInstanceEntry {
    constructor(token, instance = null) {
        this._token = token;
        this._instance = instance;
    }
    /**
     * haInstance()
     *
     * determines if the entry has a registered non-null instance.
     * @returns TRUE if the instance exists. FALSE otherwiese.
     */
    hasInstance() {
        return this._instance != null;
    }
    /**
     * instance()
     *
     * instance() gets the instance.
     * @returns the instance.
     */
    instance() {
        return this._instance;
    }
    /**
     * token()
     *
     * gets the entry's token.
     * @returns the dependency token.
     */
    token() {
        return this._token;
    }
    /**
     * setInstance()
     *
     * sets the instance of the entry.
     * @param instance the instance to set.
     */
    setInstance(instance) {
        this._instance = instance;
    }
}
exports.ModuleInstanceEntry = ModuleInstanceEntry;
//# sourceMappingURL=module-instance-entry.js.map