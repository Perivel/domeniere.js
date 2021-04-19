"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleFactoryEntry = void 0;
/**
 * ModuleFactoryEntry
 */
class ModuleFactoryEntry {
    constructor(token, factory) {
        this._token = token;
        this._factory = factory;
    }
    /**
     * factory()
     *
     * gets the factory function.
     * @returns the factory.
     */
    factory() {
        return this._factory;
    }
    /**
     * token()
     *
     * token() gets the token.
     * @returns the dependency token.
     */
    token() {
        return this._token;
    }
}
exports.ModuleFactoryEntry = ModuleFactoryEntry;
