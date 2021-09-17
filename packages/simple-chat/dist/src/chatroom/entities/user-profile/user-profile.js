"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const common_1 = require("@domeniere/common");
const entity_1 = require("@domeniere/entity");
class UserProfile extends entity_1.Entity {
    constructor(id, username) {
        super(id);
        this._username = username;
    }
    equals(suspect) {
        let isEquals = false;
        if (suspect instanceof UserProfile) {
            const other = suspect;
            isEquals = this.id().equals(other.id());
        }
        return isEquals;
    }
    username() {
        return this._username;
    }
    setUsername(username) {
        this._username = username;
        this.commitStateChanges();
    }
    serializeData() {
        return JSON.stringify({
            username: this.username().serialize(),
        });
    }
}
__decorate([
    (0, common_1.State)()
], UserProfile.prototype, "_username", void 0);
exports.UserProfile = UserProfile;
