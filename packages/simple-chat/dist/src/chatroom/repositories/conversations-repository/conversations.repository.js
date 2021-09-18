"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsRepository = void 0;
const repository_1 = require("@domeniere/repository");
const conversation_id_1 = require("../../values/conversation-id/conversation-id");
class ConversationsRepository extends repository_1.IdentityGeneratingRepository {
    constructor() {
        super();
    }
    generateIdentity() {
        return conversation_id_1.ConversationId.Generate();
    }
}
exports.ConversationsRepository = ConversationsRepository;
