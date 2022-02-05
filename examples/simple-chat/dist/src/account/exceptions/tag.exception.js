"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagException = void 0;
const core_1 = require("@swindle/core");
class TagException extends core_1.BaseException {
    constructor(message = "Tag Error") {
        super(message);
    }
}
exports.TagException = TagException;
