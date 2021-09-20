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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleChatApi = void 0;
const common_1 = require("@domeniere/common");
const core_1 = require("@domeniere/core");
const event_1 = require("@domeniere/event");
const chatroom_module_1 = __importStar(require("./chatroom/chatroom.module"));
const simple_chat_eventstore_1 = require("./simple-chat.eventstore");
/**
 * SimpleChatApi
 *
 * The Api is how your domain connects with the world.
 *
 * Learn more about Apis at https://github.com/Perivel/domeniere/blob/master/src/api/README.md
 */
let SimpleChatApi = class SimpleChatApi extends core_1.Api {
    constructor(userRepository, conversationRepository, eventStore) {
        super('simple-chat', eventStore);
        const chatroomModule = new chatroom_module_1.default();
        chatroomModule.registerRepositoryInstance(chatroom_module_1.UserRepository, userRepository);
        chatroomModule.registerRepositoryInstance(chatroom_module_1.ConversationsRepository, conversationRepository);
        this.registerModule(chatroomModule);
    }
    async createUser(registration) {
        const userRegistration = this.domain.module('chatroom').get(chatroom_module_1.UserRegistrationFactory).createFromData(registration);
        this.domain.module('chatroom').get(chatroom_module_1.CreateUserCommand).execute(userRegistration);
    }
    async createConversation(host) {
        const user = this.domain.module('chatroom').get(chatroom_module_1.UserFactory).createFromData(host);
        await this.domain.module('chatroom').get(chatroom_module_1.CreateConversationCommand).execute(user);
    }
    async getUserByNickname(nickname) {
        const nick = new chatroom_module_1.Nickname(nickname);
        const user = await this.domain.module('chatroom').get(chatroom_module_1.GetUserByNicknameQuery).execute(nick);
        const data = new chatroom_module_1.UserData();
        data.id = user.id().id();
        data.first_name = user.username().first();
        data.last_name = user.username().last();
        data.nickname = user.nickname().value();
        return data;
    }
    async getConversationsForUser(user) {
        const host = this.domain.module('chatroom').get(chatroom_module_1.UserFactory).createFromData(user);
        const conversations = await this.domain.module('chatroom').get(chatroom_module_1.GetConversationsForUserQuery).execute(host);
        return conversations.map(conversation => {
            const data = new chatroom_module_1.ConversationData();
            data.id = conversation.id().id();
            return data;
        });
    }
    async joinConversation(user, conversation) {
        const entrant = this.domain.module("chatroom").get(chatroom_module_1.UserFactory).createFromData(user);
        const targetConversation = await this.domain.module('chatroom').get(chatroom_module_1.GetConversationByIdQuery).execute(new chatroom_module_1.ConversationId(conversation.id));
        await this.domain.module('chatroom').get(chatroom_module_1.JoinConversationCommand).execute(entrant, targetConversation);
    }
    async postMessage(message, conversation) {
        const author = await this.domain.module('chatroom').get(chatroom_module_1.GetUserByIdQuery).execute(new chatroom_module_1.UserId(message.author_id));
        const convo = await this.domain.module('chatroom').get(chatroom_module_1.GetConversationByIdQuery).execute(new chatroom_module_1.ConversationId(message.conversation_id));
        const messageToPost = new chatroom_module_1.Message(chatroom_module_1.MessageId.Generate(), author.nickname(), message.content, author.id());
        await this.domain.module('chatroom').get(chatroom_module_1.PostMessageCommand).execute(messageToPost, convo);
    }
    async outputMessage(event) {
        const message = event.message();
        const conversation = event.conversation();
        console.log(`${message.content()}`);
    }
    async onJoinConversation(event) {
        const user = event.user();
        console.log(`${user.nickname().toString()} joined the conversation.`);
    }
    async handleError(event) {
        //console.log(event.serialize());
        console.log(this.subdomainName);
    }
};
__decorate([
    (0, common_1.On)(chatroom_module_1.MessagePosted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatroom_module_1.MessagePosted]),
    __metadata("design:returntype", Promise)
], SimpleChatApi.prototype, "outputMessage", null);
__decorate([
    (0, common_1.On)(chatroom_module_1.ConversationJoined),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatroom_module_1.ConversationJoined]),
    __metadata("design:returntype", Promise)
], SimpleChatApi.prototype, "onJoinConversation", null);
__decorate([
    (0, common_1.OnError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.DomainEvent]),
    __metadata("design:returntype", Promise)
], SimpleChatApi.prototype, "handleError", null);
SimpleChatApi = __decorate([
    (0, common_1.Subdomain)('simple-chat'),
    __metadata("design:paramtypes", [chatroom_module_1.UserRepository,
        chatroom_module_1.ConversationsRepository,
        simple_chat_eventstore_1.SimpleChatEventStore])
], SimpleChatApi);
exports.SimpleChatApi = SimpleChatApi;
