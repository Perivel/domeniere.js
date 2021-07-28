"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryException = void 0;
const swindle_1 = require("swindle");
class RepositoryException extends swindle_1.BaseException {
    constructor(message = "Repository Error") {
        super(message);
    }
}
exports.RepositoryException = RepositoryException;
//# sourceMappingURL=repository.exception.js.map