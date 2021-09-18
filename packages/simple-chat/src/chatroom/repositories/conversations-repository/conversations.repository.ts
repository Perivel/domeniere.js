import { IdentityGeneratingRepository } from '@domeniere/repository';
import { Conversation } from '../../aggregates/conversation/conversation';
import { User } from '../../chatroom.module';
import { ConversationId } from '../../values/conversation-id/conversation-id';
import { ConversationsRepositoryInterface } from './conversations-repository.interface';


export abstract class ConversationsRepository extends IdentityGeneratingRepository implements ConversationsRepositoryInterface {

    constructor() {
        super();
    }

    public generateIdentity(): ConversationId {
        return ConversationId.Generate();
    }

    public abstract getById(id: ConversationId): Promise<Conversation>;

    public abstract getByHost(host: User): Promise<Conversation[]>;

    public abstract remove(aggregate: Conversation): Promise<void>;

    public abstract save(aggregate: Conversation): Promise<void>;

    public abstract size(): Promise<number>;
}