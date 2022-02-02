"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryException = void 0;
const core_1 = require("@swindle/core");
class RepositoryException extends core_1.BaseException {
    constructor(message = "Repository Error") {
        super(message);
    }
}
exports.RepositoryException = RepositoryException;
//# sourceMappingURL=repository.exception.js.map