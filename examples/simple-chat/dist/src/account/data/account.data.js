"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountData = void 0;
const framework_1 = require("@domeniere/framework");
class AccountData extends framework_1.Data {
    constructor(id, username, tag, dob, age, created_on, updated_on, deleted_on = null) {
        super();
        this.id = id;
        this.username = username;
        this.tag = tag;
        this.dob = dob;
        this.age = age;
        this.created_on = created_on;
        this.updated_on = updated_on;
        this.deleted_on = deleted_on;
    }
    serialize() {
        return JSON.stringify({
            id: this.id,
            username: this.username,
            tag: this.tag.serialize(),
            dob: this.dob.toString(),
            age: this.age.toString(),
            created_on: this.created_on.toString(),
            updated_on: this.updated_on.toString(),
            deleted_on: this.deleted_on ? this.deleted_on.toString() : null
        });
    }
}
exports.AccountData = AccountData;
