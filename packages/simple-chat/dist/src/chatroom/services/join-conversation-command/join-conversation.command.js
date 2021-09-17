"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinConversationCommand = void 0;
const service_1 = require("@domeniere/service");
const chatroom_module_1 = require("../../chatroom.module");
class JoinConversationCommand extends service_1.Command {
    constructor(conversationRepository) {
        super();
        this.conversationRepository = conversationRepository;
    }
    async execute(user, conversation) {
        conversation.addMember(user.id());
        try {
            await this.conversationRepository.save(conversation);
            conversation.confirmStateChanges();
            await this.emit(new chatroom_module_1.ConversationJoined(user, conversation));
        }
        catch (e) {
            conversation.rollbackStateChanges();
            throw e;
        }
    }
}
exports.JoinConversationCommand = JoinConversationCommand;
