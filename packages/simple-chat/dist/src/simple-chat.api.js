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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleChatApi = void 0;
const common_1 = require("@domeniere/common");
const core_1 = require("@domeniere/core");
const event_1 = require("@domeniere/event");
const chatroom_module_1 = require("./chatroom/chatroom.module");
/**
 * SimpleChatApi
 *
 * The Api is how your domain connects with the world.
 *
 * Learn more about Apis at https://github.com/Perivel/domeniere/blob/master/src/api/README.md
 */
class SimpleChatApi extends core_1.Api {
    constructor(userRepository, conversationRepository, eventStore) {
        super('simple-chat', eventStore);
        const chatroomModule = new chatroom_module_1.ChatroomModule();
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
    async testState() {
        const data = new chatroom_module_1.UserRegistrationData();
        data.first_name = "Bob";
        data.last_name = "Billy";
        data.nickname = "Bobby";
        const registration = this.domain.module('chatroom').get(chatroom_module_1.UserRegistrationFactory).createFromData(data);
        // create the user.
        await this.domain.module('chatroom').get(chatroom_module_1.CreateUserCommand).execute(registration);
        const user = await this.domain.module('chatroom').get(chatroom_module_1.GetUserByNicknameQuery).execute(new chatroom_module_1.Nickname(data.nickname));
        console.log(`Original Nickname: ${user.nickname().toString()}`);
        // change the nickname.
        const newNickname = new chatroom_module_1.Nickname("Rob");
        user.setNickname(newNickname);
        console.log(`Expected: ${newNickname.toString()}\tReceived: ${user.nickname().toString()}`);
        user.rollbackStateChanges();
        console.log(`Expected: ${data.nickname}\tReceived: ${user.nickname().toString()}`);
        user.setNickname(newNickname);
        user.confirmStateChanges();
        console.log(`Expected: ${newNickname.toString()}\tReceived: ${user.nickname().toString()}`);
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
        console.log(this.subdomainName);
    }
    async anotherHandler(event) {
        console.log(`On Subdomain: ${this.subdomainName}`);
    }
}
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
__decorate([
    (0, common_1.OnAny)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_1.DomainEvent]),
    __metadata("design:returntype", Promise)
], SimpleChatApi.prototype, "anotherHandler", null);
exports.SimpleChatApi = SimpleChatApi;
