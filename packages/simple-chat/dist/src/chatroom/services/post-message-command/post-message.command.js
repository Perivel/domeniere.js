"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessageCommand = void 0;
const service_1 = require("@domeniere/service");
const chatroom_module_1 = require("../../chatroom.module");
class PostMessageCommand extends service_1.Command {
    constructor(repository) {
        super();
        this.conversationRepository = repository;
    }
    async execute(message, conversation) {
        conversation.postMessage(message);
        try {
            await this.conversationRepository.save(conversation);
            conversation.confirmStateChanges();
            await this.emit(new chatroom_module_1.MessagePosted(message, conversation));
        }
        catch (e) {
            conversation.rollbackStateChanges();
            throw e;
        }
    }
}
exports.PostMessageCommand = PostMessageCommand;
