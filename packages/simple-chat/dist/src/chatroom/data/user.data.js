"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const dto_1 = require("@domeniere/dto");
class UserData extends dto_1.Data {
    constructor() {
        super();
        this.id = "";
        this.first_name = "";
        this.last_name = "";
        this.nickname = "";
    }
    serialize() {
        return JSON.stringify({
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            nickname: this.nickname,
        });
    }
}
exports.UserData = UserData;
