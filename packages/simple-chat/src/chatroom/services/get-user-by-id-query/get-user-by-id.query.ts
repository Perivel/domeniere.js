import { Query } from '@domeniere/service';
import { UserId, UserRepository } from '../../chatroom.module';


export class GetUserByIdQuery extends Query {

    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        super();
        this.userRepository = userRepository;
    }

    public async execute(id: UserId): Promise<any> {
        try {
            return await this.userRepository.getById(id);
        }
        catch(e) {
            throw e;
        }
    }
}