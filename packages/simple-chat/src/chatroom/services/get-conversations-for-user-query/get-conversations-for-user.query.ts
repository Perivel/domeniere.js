import { Query } from '@domeniere/service';
import { Conversation, ConversationsRepository, User } from '../../chatroom.module';


export class GetConversationsForUserQuery extends Query {

    private readonly conversationRepository: ConversationsRepository;

    constructor(conversationRepository: ConversationsRepository) {
        super();
        this.conversationRepository = conversationRepository;
    }

    public async execute(user: User): Promise<Conversation[]> {
        try {
            return await this.conversationRepository.getByHost(user);
        }
        catch(e) {
            throw e;
        }
    }
}