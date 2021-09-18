import { IdentityGeneratingRepository } from '@domeniere/repository';
import { User } from '../../aggregates/aggregates.well';
import { Nickname, UserId } from '../../chatroom.module';
import { UserRepositoryInterface } from './user-repository.interface';
export declare abstract class UserRepository extends IdentityGeneratingRepository implements UserRepositoryInterface {
    constructor();
    generateIdentity(): UserId;
    abstract getById(id: UserId): Promise<User>;
    abstract getByNickname(nickname: Nickname): Promise<User>;
    abstract remove(aggregate: User): Promise<void>;
    abstract save(aggregate: User): Promise<void>;
    abstract size(): Promise<number>;
}
//# sourceMappingURL=user.repository.d.ts.map