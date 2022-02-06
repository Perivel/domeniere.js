"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleChatApi = void 0;
const framework_1 = require("@domeniere/framework");
const common_1 = require("@domeniere/common");
const conversation_module_1 = __importDefault(require("./conversation/conversation.module"));
const account_module_1 = __importStar(require("./account/account.module"));
class SimpleChatApi extends framework_1.Api {
    constructor(accountsRepository, eventStore) {
        super('simple-chat', eventStore);
        const accountsModule = new account_module_1.default();
        accountsModule.registerRepositoryInstance(account_module_1.AccountRepository, accountsRepository);
        this.registerModule(accountsModule);
        const conversationModule = new conversation_module_1.default();
        this.registerModule(conversationModule);
    }
    async createUser(registrationData) {
        // convert the DTO to a Domain Object.
        const registration = this.accountsModule
            .get(account_module_1.AccountRegistrationFactory)
            .createFromDto(registrationData);
        // verify the registration meets our requirements.
        const nameSpec = new account_module_1.UsernameSpecification();
        const tagSpec = new account_module_1.TagSpecification();
        const ageSpec = new account_module_1.AgeSpecification();
        const validRegistration = nameSpec
            .and(tagSpec)
            .and(ageSpec)
            .isSatisfiedBy(registration);
        if (!validRegistration) {
            throw new Error('Invalid registration.');
        }
        // create account.
        await this.accountsModule
            .get(account_module_1.CreateAccountCommand)
            .execute(registration);
    }
    async createConversation() {
        //
    }
    async getAccountByTag(tag) {
        // covert the dto to a domain object.
        const tagObj = new account_module_1.Tag(tag.tag);
        // get the account using the tag.
        const account = await this.accountsModule
            .get(account_module_1.GetAccountByTagQuery)
            .execute(tagObj);
        // convert to an account data instance, and return it.
        return this.accountsModule
            .get(account_module_1.AccountDataFactory)
            .createFromAccountObject(account);
    }
    async getConversationById() {
        //
    }
    async sendMessage() {
        //
    }
    async handleError(event) {
        console.log(event.toString());
    }
    async announceRegistration(event) {
        console.log(`${event.account().username()} has created an account successfully.`);
    }
}
__decorate([
    (0, common_1.ModuleRef)('account'),
    __metadata("design:type", framework_1.ModuleReference)
], SimpleChatApi.prototype, "accountsModule", void 0);
__decorate([
    (0, common_1.ModuleRef)('conversation'),
    __metadata("design:type", framework_1.ModuleReference)
], SimpleChatApi.prototype, "conversationModule", void 0);
__decorate([
    (0, common_1.OnError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [framework_1.DomainEvent]),
    __metadata("design:returntype", Promise)
], SimpleChatApi.prototype, "handleError", null);
__decorate([
    (0, common_1.On)(account_module_1.AccountCreated, { label: "account-registered" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_module_1.AccountCreated]),
    __metadata("design:returntype", Promise)
], SimpleChatApi.prototype, "announceRegistration", null);
exports.SimpleChatApi = SimpleChatApi;
