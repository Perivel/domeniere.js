import { Api, DomainEvent, ModuleReference } from '@domeniere/framework';
import { ModuleRef, On, OnError } from '@domeniere/common';
import { SimpleChatEventStore } from './simple-chat.eventstore';
import ConversationModule from './conversation/conversation.module';
import AccountModule, { 
    AccountCreated,
    AccountRegistrationData,
    AccountRegistrationFactory,
    AccountRepository,
    AgeSpecification,
    CreateAccountCommand,
    TagSpecification,
    UsernameSpecification,
} from './account/account.module';


export class SimpleChatApi extends Api {

    @ModuleRef('account')
    private readonly accountsModule!: ModuleReference;

    @ModuleRef('conversation')
    private readonly conversationModule!: ModuleReference;

    constructor(
        accountsRepository: AccountRepository,
        eventStore: SimpleChatEventStore
    ) {
        super('simple-chat', eventStore);
        const accountsModule = new AccountModule();
        accountsModule.registerRepositoryInstance(AccountRepository, accountsRepository);
        this.registerModule(accountsModule);
        const conversationModule = new ConversationModule();
        this.registerModule(conversationModule);
    }

    public async createUser(registrationData: AccountRegistrationData): Promise<void> {
        const registration = this.accountsModule
            .get(AccountRegistrationFactory)
            .createFromDto(registrationData);

        // verify
        const nameSpec = new UsernameSpecification();
        const tagSpec = new TagSpecification();
        const ageSpec = new AgeSpecification();
        const validRegistration = nameSpec
            .and(tagSpec)
            .and(ageSpec)
            .isSatisfiedBy(registration);
        
        if (!validRegistration) {
            throw new Error('Invalid registration.');
        }

        // create account.
        await this.accountsModule
            .get(CreateAccountCommand)
            .execute(registration);
    }

    public async createConversation(): Promise<void> {

    }

    public async getUserByTag(): Promise<void> {

    }

    public async getConversationById(): Promise<any> {

    }

    public async sendMessage(): Promise<void> {

    }

    @OnError()
    public async handleError(event: DomainEvent): Promise<void> {
        console.log(event.toString());
    }

    @On(AccountCreated, { label: "account-registered"})
    public async announceRegistration(event: AccountCreated): Promise<void> {
        console.log(`${event.account().username()} has created an account successfully.`);
    }
}