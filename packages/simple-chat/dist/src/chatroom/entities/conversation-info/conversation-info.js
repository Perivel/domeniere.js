"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationInfo = void 0;
const common_1 = require("@domeniere/common");
const entity_1 = require("@domeniere/entity");
const core_1 = require("@swindle/core");
class ConversationInfo extends entity_1.Entity {
    constructor(id, host, created = core_1.DateTime.Now()) {
        super(id);
        this._host = host;
        this._members = [host];
        this._createdAt = created;
    }
    ;
    addMember(member) {
        if (!this.hasMember(member)) {
            this._members = [...this.members(), member];
            this.commitStateChanges();
        }
    }
    created() {
        return this._createdAt;
    }
    equals(suspect) {
        let isEquals = false;
        if (suspect instanceof ConversationInfo) {
            const other = suspect;
            isEquals = this.id().equals(other.id());
        }
        return isEquals;
    }
    hasMember(member) {
        return this.members().some(mem => mem.equals(member));
    }
    host() {
        return this._host;
    }
    members() {
        return this._members;
    }
    removeMember(member) {
        if (this.hasMember(member)) {
            this._members = this.members().filter(mem => !mem.equals(member));
            this.commitStateChanges();
        }
    }
    serializeData() {
        return JSON.stringify({
            host: this.host().serialize(),
            members: this.members().map(member => member.serialize()),
            created: this.created().toString()
        });
    }
    id() {
        return super.id();
    }
}
__decorate([
    (0, common_1.State)()
], ConversationInfo.prototype, "_members", void 0);
exports.ConversationInfo = ConversationInfo;
