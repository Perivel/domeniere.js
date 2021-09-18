"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationData = void 0;
const dto_1 = require("@domeniere/dto");
class UserRegistrationData extends dto_1.Data {
    constructor() {
        super();
        this.first_name = "";
        this.last_name = "";
        this.nickname = "";
    }
    serialize() {
        return JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            nickname: this.nickname
        });
    }
}
exports.UserRegistrationData = UserRegistrationData;
