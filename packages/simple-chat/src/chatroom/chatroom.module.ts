import { Module } from '@domeniere/module';
import { 
    UserFactory,
    UserDataFactory,
    UserRegistrationFactory
} from "./factories/factories.well";
import { 
    UserRepository,
    ConversationsRepository,
} from './repositories/repositories.well';
import {
    CreateConversationCommand,
    CreateUserCommand,
    GetConversationByIdQuery,
    GetConversationsForUserQuery,
    GetUserByIdQuery,
    GetUserByNicknameQuery,
    JoinConversationCommand,
    PostMessageCommand,
} from './services/services.well';


export default class ChatroomModule extends Module {
    constructor() {
        super('chatroom');
    }

    protected createdBindings() {
        // register module bindings here.
        this.bindFactory(UserFactory, (_) => new UserFactory());
        this.bindFactory(UserDataFactory, (_) => new UserDataFactory());
        this.bindFactory(UserRegistrationFactory, (_) => new UserRegistrationFactory());
        this.bindRepository(UserRepository);
        this.bindRepository(ConversationsRepository);
        this.bindService(CreateUserCommand, (module) => {
            return new CreateUserCommand(
                module.get(UserFactory),
                module.get(UserRepository)
            );
        });
        this.bindService(CreateConversationCommand, (module) => {
            return new CreateConversationCommand(module.get(ConversationsRepository));
        });
        this.bindService(PostMessageCommand, (module) => {
            return new PostMessageCommand(module.get(ConversationsRepository));
        });
        this.bindService(GetUserByNicknameQuery, (module) => {
            return new GetUserByNicknameQuery(module.get(UserRepository));
        });
        this.bindService(GetConversationsForUserQuery, (module) => {
            return new GetConversationsForUserQuery(module.get(ConversationsRepository));
        })
        this.bindService(GetConversationByIdQuery, (module) => {
            return new GetConversationByIdQuery(module.get(ConversationsRepository));
        });
        this.bindService(JoinConversationCommand, (module) => {
            return new JoinConversationCommand(module.get(ConversationsRepository));
        });
        this.bindService(GetUserByIdQuery, (module) => {
            return new GetUserByIdQuery(module.get(UserRepository));
        })
    }
}

// module well exports go here.
export * from './values/values.well';
export * from './entities/entities.well';
export * from './aggregates/aggregates.well';
export * from './data/data.well';
export * from './factories/factories.well';
export * from './repositories/repositories.well';
export * from './services/services.well';
export * from './events/events.well';