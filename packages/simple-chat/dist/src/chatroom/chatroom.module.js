"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatroomModule = void 0;
const module_1 = require("@domeniere/module");
const factories_well_1 = require("./factories/factories.well");
const repositories_well_1 = require("./repositories/repositories.well");
const services_well_1 = require("./services/services.well");
class ChatroomModule extends module_1.Module {
    constructor() {
        super('chatroom');
    }
    createdBindings() {
        // register module bindings here.
        this.bindFactory(factories_well_1.UserFactory, (_) => new factories_well_1.UserFactory());
        this.bindFactory(factories_well_1.UserDataFactory, (_) => new factories_well_1.UserDataFactory());
        this.bindFactory(factories_well_1.UserRegistrationFactory, (_) => new factories_well_1.UserRegistrationFactory());
        this.bindRepository(repositories_well_1.UserRepository);
        this.bindRepository(repositories_well_1.ConversationsRepository);
        this.bindService(services_well_1.CreateUserCommand, (module) => {
            return new services_well_1.CreateUserCommand(module.get(factories_well_1.UserFactory), module.get(repositories_well_1.UserRepository));
        });
        this.bindService(services_well_1.CreateConversationCommand, (module) => {
            return new services_well_1.CreateConversationCommand(module.get(repositories_well_1.ConversationsRepository));
        });
        this.bindService(services_well_1.PostMessageCommand, (module) => {
            return new services_well_1.PostMessageCommand(module.get(repositories_well_1.ConversationsRepository));
        });
        this.bindService(services_well_1.GetUserByNicknameQuery, (module) => {
            return new services_well_1.GetUserByNicknameQuery(module.get(repositories_well_1.UserRepository));
        });
        this.bindService(services_well_1.GetConversationsForUserQuery, (module) => {
            return new services_well_1.GetConversationsForUserQuery(module.get(repositories_well_1.ConversationsRepository));
        });
        this.bindService(services_well_1.GetConversationByIdQuery, (module) => {
            return new services_well_1.GetConversationByIdQuery(module.get(repositories_well_1.ConversationsRepository));
        });
        this.bindService(services_well_1.JoinConversationCommand, (module) => {
            return new services_well_1.JoinConversationCommand(module.get(repositories_well_1.ConversationsRepository));
        });
        this.bindService(services_well_1.GetUserByIdQuery, (module) => {
            return new services_well_1.GetUserByIdQuery(module.get(repositories_well_1.UserRepository));
        });
    }
}
exports.ChatroomModule = ChatroomModule;
// module well exports go here.
__exportStar(require("./values/values.well"), exports);
__exportStar(require("./entities/entities.well"), exports);
__exportStar(require("./aggregates/aggregates.well"), exports);
__exportStar(require("./data/data.well"), exports);
__exportStar(require("./factories/factories.well"), exports);
__exportStar(require("./repositories/repositories.well"), exports);
__exportStar(require("./services/services.well"), exports);
__exportStar(require("./events/events.well"), exports);
