"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const aggregate_1 = require("@domeniere/aggregate");
const common_1 = require("@domeniere/common");
const core_1 = require("@swindle/core");
class Conversation extends aggregate_1.TimestampedAggregate {
    constructor(conversation, messages = [], version = 1.0, createdOn = core_1.DateTime.Now(), updatedOn = core_1.DateTime.Now(), deletedOn = null) {
        super(conversation, version, createdOn, updatedOn, deletedOn);
        this._messages = messages;
    }
    addMember(member) {
        this.root().addMember(member);
        this.commitStateChanges();
    }
    clearMessages() {
        this._messages = [];
        this.commitStateChanges();
    }
    equals(suspect) {
        let isEquals = false;
        if (suspect instanceof Conversation) {
            const other = suspect;
            isEquals = this.id().equals(other.id());
        }
        return isEquals;
    }
    host() {
        return this.root().host();
    }
    messages() {
        return this._messages;
    }
    postMessage(message) {
        if (this.root().hasMember(message.authorId())) {
            this._messages = [...this.messages(), message];
            this.commitStateChanges();
        }
    }
    removeMember(member) {
        this.root().removeMember(member);
        this.commitStateChanges();
    }
    serializeData() {
        return JSON.stringify({
            messages: this.messages().map(msg => msg.serialize()),
        });
    }
    root() {
        return super.root();
    }
    id() {
        return super.id();
    }
}
__decorate([
    (0, common_1.State)()
], Conversation.prototype, "_messages", void 0);
exports.Conversation = Conversation;
