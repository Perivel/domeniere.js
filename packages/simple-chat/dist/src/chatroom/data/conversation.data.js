"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationData = void 0;
const dto_1 = require("@domeniere/dto");
class ConversationData extends dto_1.Data {
    constructor() {
        super();
        this.id = "";
    }
    serialize() {
        return JSON.stringify({
            id: this.id
        });
    }
}
exports.ConversationData = ConversationData;
