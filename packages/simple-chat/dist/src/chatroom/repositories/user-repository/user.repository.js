"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const repository_1 = require("@domeniere/repository");
const chatroom_module_1 = require("../../chatroom.module");
class UserRepository extends repository_1.IdentityGeneratingRepository {
    constructor() {
        super();
    }
    generateIdentity() {
        return chatroom_module_1.UserId.Generate();
    }
}
exports.UserRepository = UserRepository;
