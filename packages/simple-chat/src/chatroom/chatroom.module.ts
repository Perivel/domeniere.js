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