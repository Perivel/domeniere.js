"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConversationCommand = void 0;
const core_1 = require("@swindle/core");
const service_1 = require("@domeniere/service");
const aggregates_well_1 = require("../../aggregates/aggregates.well");
const chatroom_module_1 = require("../../chatroom.module");
class CreateConversationCommand extends service_1.Command {
    constructor(repository) {
        super();
        this.conversationRepository = repository;
    }
    async execute(host) {
        const conversation = new aggregates_well_1.Conversation(new chatroom_module_1.ConversationInfo(this.conversationRepository.generateIdentity(), host.id(), core_1.DateTime.Now()), []);
        try {
            await this.conversationRepository.save(conversation);
            await this.emit(new chatroom_module_1.ConversationCreated(conversation));
        }
        catch (e) {
            throw e;
        }
    }
}
exports.CreateConversationCommand = CreateConversationCommand;
