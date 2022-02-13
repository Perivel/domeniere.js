import { Identifier, IdentityGeneratingRepository, Aggregate } from '@domeniere/framework';
import { MethodUndefinedException } from '@swindle/core';
import { Conversation } from '../aggregates/aggregates.well';
import { ConversationId } from '../values/values.well';


export abstract class ConversationRepository extends IdentityGeneratingRepository {

    constructor() {
        super();
    }

    public generateIdentity(): ConversationId {
        return ConversationId.Generate();
    }

    public abstract getById(id: ConversationId): Promise<Conversation|null>;

    public abstract remove(conversation: Conversation): Promise<void>;

    public abstract save(conversation: Conversation): Promise<void>;

    public abstract size(): Promise<number>;
}