import { IdentityGeneratingRepository } from '@domeniere/repository';
import { Conversation } from '../../aggregates/conversation/conversation';
import { User } from '../../chatroom.module';
import { ConversationId } from '../../values/conversation-id/conversation-id';
import { ConversationsRepositoryInterface } from './conversations-repository.interface';
export declare abstract class ConversationsRepository extends IdentityGeneratingRepository implements ConversationsRepositoryInterface {
    constructor();
    generateIdentity(): ConversationId;
    abstract getById(id: ConversationId): Promise<Conversation>;
    abstract getByHost(host: User): Promise<Conversation[]>;
    abstract remove(aggregate: Conversation): Promise<void>;
    abstract save(aggregate: Conversation): Promise<void>;
    abstract size(): Promise<number>;
}
//# sourceMappingURL=conversations.repository.d.ts.map