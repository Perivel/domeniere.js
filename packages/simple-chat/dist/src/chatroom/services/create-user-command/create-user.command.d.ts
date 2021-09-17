import { Command } from '@domeniere/service';
import { UserRepository } from './../../repositories/repositories.well';
import { UserFactory } from "./../../factories/factories.well";
import { UserRegistration } from '../../chatroom.module';
export declare class CreateUserCommand extends Command {
    private readonly userRepository;
    private readonly usrFactory;
    constructor(factory: UserFactory, repository: UserRepository);
    execute(registration: UserRegistration): Promise<void>;
}
//# sourceMappingURL=create-user.command.d.ts.map