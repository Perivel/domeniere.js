"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdException = void 0;
const core_1 = require("@swindle/core");
class UserIdException extends core_1.BaseException {
    constructor(message = "User Id Error") {
        super(message);
    }
}
exports.UserIdException = UserIdException;
