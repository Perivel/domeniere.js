import { Query } from '@domeniere/service';
import { Conversation, ConversationId, ConversationsRepository } from '../../chatroom.module';
export declare class GetConversationByIdQuery extends Query {
    private readonly conversationRepository;
    constructor(conversationRepository: ConversationsRepository);
    execute(id: ConversationId): Promise<Conversation>;
}
//# sourceMappingURL=get-conversation-by-id.query.d.ts.map