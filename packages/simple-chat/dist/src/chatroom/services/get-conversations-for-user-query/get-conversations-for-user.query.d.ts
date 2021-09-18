import { Query } from '@domeniere/service';
import { Conversation, ConversationsRepository, User } from '../../chatroom.module';
export declare class GetConversationsForUserQuery extends Query {
    private readonly conversationRepository;
    constructor(conversationRepository: ConversationsRepository);
    execute(user: User): Promise<Conversation[]>;
}
//# sourceMappingURL=get-conversations-for-user.query.d.ts.map