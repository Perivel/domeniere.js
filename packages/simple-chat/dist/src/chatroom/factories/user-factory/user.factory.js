"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const factory_1 = require("@domeniere/factory");
const chatroom_module_1 = require("../../chatroom.module");
const nickname_1 = require("../../values/nickname/nickname");
const username_1 = require("../../values/username/username");
class UserFactory extends factory_1.AbstractFactory {
    constructor() {
        super();
    }
    createFromRaw(id, first_name, last_name, nickname) {
        return new chatroom_module_1.User(new chatroom_module_1.UserProfile(new chatroom_module_1.UserId(id), new username_1.Username(first_name, last_name)), new nickname_1.Nickname(nickname));
    }
    createFromData(data) {
        return this.createFromRaw(data.id, data.first_name, data.last_name, data.nickname);
    }
}
exports.UserFactory = UserFactory;
