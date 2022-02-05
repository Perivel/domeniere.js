"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const account_module_1 = __importDefault(require("./account/account.module"));
class SimpleChatApi extends framework_1.Api {
    constructor(eventStore) {
        super('simple-chat', eventStore);
        const accountsModule = new account_module_1.default();
        this.registerModule(accountsModule);
        const conversationModule = new conversation_module_1.default();
        this.registerModule(conversationModule);
    }
    async createUser() {
        //
    }
    async createConversation() {
    }
    async getUserByTag() {
    }
    async getConversationById() {
    }
    async sendMessage() {
    }
    async handleError(event) {
        console.log(event.toString());
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
exports.SimpleChatApi = SimpleChatApi;
