import { IdentityGeneratingRepository } from '@domeniere/repository';
import { User } from '../../aggregates/aggregates.well';
import { UserId } from '../../chatroom.module';
import { UserRepositoryInterface } from './user-repository.interface';


export abstract class UserRepository extends IdentityGeneratingRepository implements UserRepositoryInterface {

    constructor() {
        super();
    }

    public generateIdentity(): UserId {
        return UserId.Generate();
    }

    public abstract getById(id: UserId): Promise<User>

    public abstract remove(aggregate: User): Promise<void>;

    public abstract save(aggregate: User): Promise<void>;

    public abstract size(): Promise<number>;
}