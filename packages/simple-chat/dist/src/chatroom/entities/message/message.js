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
exports.Message = void 0;
const common_1 = require("@domeniere/common");
const entity_1 = require("@domeniere/entity");
const core_1 = require("@swindle/core");
class Message extends entity_1.TimestampedEntity {
    constructor(id, displayName, content, author, createdOn = core_1.DateTime.Now(), updatedOn = core_1.DateTime.Now(), deletedOn = null) {
        super(id, createdOn, updatedOn, deletedOn);
        this._author_id = author;
        this._display_name = displayName;
        this._content = content;
    }
    equals(suspect) {
        let isEquals = false;
        if (suspect instanceof Message) {
            const other = suspect;
            isEquals = this.id().equals(other.id());
        }
        return isEquals;
    }
    authorId() {
        return this._author_id;
    }
    content() {
        return this._content;
    }
    name() {
        return this._display_name;
    }
    serializeData() {
        return JSON.stringify({
            author: {
                id: this.authorId().serialize(),
                name: this.name().serialize()
            },
            content: this.content(),
        });
    }
    setContent(content) {
        this._content = content;
        this.commitStateChanges();
    }
}
__decorate([
    (0, common_1.State)(),
    __metadata("design:type", String)
], Message.prototype, "_content", void 0);
exports.Message = Message;
