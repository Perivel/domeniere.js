import { Command } from '@domeniere/service';
import { UserRepository  } from './../../repositories/repositories.well';
import { UserFactory } from "./../../factories/factories.well";
import { UserCreated, UserRegistration } from '../../chatroom.module';

export class CreateUserCommand extends Command {

    private readonly userRepository: UserRepository;
    private readonly usrFactory: UserFactory;
    constructor(
        factory: UserFactory,
        repository: UserRepository,
    ) {
        super();
        this.usrFactory = factory;
        this.userRepository = repository;
    }

    public async execute(registration: UserRegistration): Promise<void> {
        const id = this.userRepository.generateIdentity();

        const user = this.usrFactory.createFromRaw(
            id.id(),
            registration.username().first(),
            registration.username().last(),
            registration.nickname() ? registration.nickname()!.value() : ""
        );

        try {
            await this.userRepository.save(user);
            await this.emit(new UserCreated(user));
        }
        catch(e) {
            throw e;
        }
    }
}