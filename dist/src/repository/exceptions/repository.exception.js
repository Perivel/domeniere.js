"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryException = void 0;
const foundation_1 = require("@perivel/foundation");
class RepositoryException extends foundation_1.BaseException {
    constructor(message = "Repository Error") {
        super(message);
    }
}
exports.RepositoryException = RepositoryException;
//# sourceMappingURL=repository.exception.js.map