"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
/**
 * Data
 *
 * Data is the base class for a Data Transfer Object.
 */
class Data {
    constructor() { }
    toString() {
        return this.serialize();
    }
}
exports.Data = Data;
//# sourceMappingURL=data.js.map