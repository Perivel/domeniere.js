"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@domeniere/common");
const aggregate_1 = require("@domeniere/aggregate");
class User extends aggregate_1.Aggregate {
    constructor(user, nickname, version = 1.0) {
        super(user, version);
        this._nickname = nickname;
    }
    equals(suspect) {
        let isEquals = false;
        if (suspect instanceof User) {
            const other = suspect;
            isEquals = this.id().equals(other.id());
        }
        return isEquals;
    }
    id() {
        return super.id();
    }
    nickname() {
        return this._nickname;
    }
    setNickname(nickname) {
        this._nickname = nickname;
        this.commitStateChanges();
    }
    serializeData() {
        return JSON.stringify({
            nickname: this.nickname().serialize()
        });
    }
    username() {
        return this.root().username();
    }
    root() {
        return super.root();
    }
}
__decorate([
    (0, common_1.State)()
], User.prototype, "_nickname", void 0);
exports.User = User;
