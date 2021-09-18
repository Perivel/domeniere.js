import { Query } from '@domeniere/service';
import { MethodUndefinedException } from '@swindle/core';
import { Conversation, ConversationId, ConversationsRepository, ConversationsRepositoryInterface } from '../../chatroom.module';


export class GetConversationByIdQuery extends Query {

    private readonly conversationRepository: ConversationsRepository;

    constructor(conversationRepository: ConversationsRepository) {
        super();
        this.conversationRepository = conversationRepository;
    }

    public async execute(id: ConversationId): Promise<Conversation> {
        try {
            return await this.conversationRepository.getById(id);
        }
        catch(e) {
            throw e;
        }
    }
}