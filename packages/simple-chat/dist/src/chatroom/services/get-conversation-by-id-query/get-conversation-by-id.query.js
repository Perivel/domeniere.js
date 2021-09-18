"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConversationByIdQuery = void 0;
const service_1 = require("@domeniere/service");
class GetConversationByIdQuery extends service_1.Query {
    constructor(conversationRepository) {
        super();
        this.conversationRepository = conversationRepository;
    }
    async execute(id) {
        try {
            return await this.conversationRepository.getById(id);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.GetConversationByIdQuery = GetConversationByIdQuery;
