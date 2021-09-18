import { Query } from '@domeniere/service';
import { Nickname, User, UserRepository } from '../../chatroom.module';
export declare class GetUserByNicknameQuery extends Query {
    private readonly userRepository;
    constructor(repository: UserRepository);
    execute(nickname: Nickname): Promise<User>;
}
//# sourceMappingURL=get-user-by-nickname.query.d.ts.map