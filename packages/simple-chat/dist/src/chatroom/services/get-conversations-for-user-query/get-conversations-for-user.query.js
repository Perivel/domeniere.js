"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConversationsForUserQuery = void 0;
const service_1 = require("@domeniere/service");
class GetConversationsForUserQuery extends service_1.Query {
    constructor(conversationRepository) {
        super();
        this.conversationRepository = conversationRepository;
    }
    async execute(user) {
        try {
            return await this.conversationRepository.getByHost(user);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.GetConversationsForUserQuery = GetConversationsForUserQuery;
