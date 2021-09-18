import { DateTime } from '@swindle/core';
import { Command } from '@domeniere/service';
import { Conversation, User } from '../../aggregates/aggregates.well';
import { ConversationCreated, ConversationInfo } from '../../chatroom.module';
import { ConversationsRepository } from "./../../repositories/repositories.well";


export class CreateConversationCommand extends Command {

    private readonly conversationRepository: ConversationsRepository;

    constructor(repository: ConversationsRepository) {
        super();
        this.conversationRepository = repository;
    }

    public async execute(host: User): Promise<void> {
        const conversation = new Conversation(new ConversationInfo(
            this.conversationRepository.generateIdentity(),
            host.id(),
            DateTime.Now()
        ), []);

        try {
            await this.conversationRepository.save(conversation);
            await this.emit(new ConversationCreated(conversation));
        }
        catch(e) {
            throw e;
        }
    }
}