import { Api, DomainEvent, ModuleReference } from '@domeniere/framework';
import { ModuleRef, On, OnError } from '@domeniere/common';
import { SimpleChatEventStore } from './simple-chat.eventstore';
import ConversationModule, { 
    ConversationRepository, 
} from './conversation/conversation.module';
import AccountModule, { 
    AccountCreated,
    AccountData,
    AccountDataFactory,
    AccountRegistrationData,
    AccountRegistrationFactory,
    AccountRepository,
    AgeSpecification,
    CreateAccountCommand,
    GetAccountByTagQuery,
    Tag,
    TagData,
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
        conversationRepository: ConversationRepository,
        eventStore: SimpleChatEventStore
    ) {
        super('simple-chat', eventStore);
        const accountsModule = new AccountModule();
        accountsModule.registerRepositoryInstance(AccountRepository, accountsRepository);
        this.registerModule(accountsModule);
        
        const conversationModule = new ConversationModule();
        conversationModule.registerRepositoryInstance(ConversationRepository, conversationRepository);
        this.registerModule(conversationModule);
    }

    public async createUser(registrationData: AccountRegistrationData): Promise<void> {
        // convert the DTO to a Domain Object.
        const registration = this.accountsModule
            .get(AccountRegistrationFactory)
            .createFromDto(registrationData);

        // verify the registration meets our requirements.
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

    public async getAccountByTag(tag: TagData): Promise<AccountData> {
        // covert the dto to a domain object.
        const tagObj = new Tag(tag.tag);

        // get the account using the tag.
        const account = await this.accountsModule
            .get(GetAccountByTagQuery)
            .execute(tagObj);
        
        // convert to an account data instance, and return it.
        return this.accountsModule
            .get(AccountDataFactory)
            .createFromAccountObject(account);
    }

    public async getConversationById(): Promise<any> {
        //
    }

    public async sendMessage(): Promise<void> {
        //
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