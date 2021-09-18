import { Query } from '@domeniere/service';
import { UserId, UserRepository } from '../../chatroom.module';
export declare class GetUserByIdQuery extends Query {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: UserId): Promise<any>;
}
//# sourceMappingURL=get-user-by-id.query.d.ts.map