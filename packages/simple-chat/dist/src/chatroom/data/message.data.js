"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageData = void 0;
const dto_1 = require("@domeniere/dto");
class MessageData extends dto_1.Data {
    constructor() {
        super();
        this.author_id = "";
        this.conversation_id = "";
        this.content = "";
    }
    serialize() {
        return JSON.stringify({
            author: this.author_id,
            conversation: this.conversation_id,
            content: this.content
        });
    }
}
exports.MessageData = MessageData;
