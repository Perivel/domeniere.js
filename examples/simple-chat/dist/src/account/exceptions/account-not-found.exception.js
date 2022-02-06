"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountNotFoundException = void 0;
const core_1 = require("@swindle/core");
class AccountNotFoundException extends core_1.BaseException {
    constructor(message = "Account Not Found Error") {
        super(message);
    }
}
exports.AccountNotFoundException = AccountNotFoundException;
