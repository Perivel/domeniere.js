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
exports.User = void 0;
const common_1 = require("@domeniere/common");
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
const values_well_1 = require("../../values/values.well");
/**
 * User
 *
 * Represents a User entity.
 */
class User extends framework_1.Entity {
    constructor(id, username, tag, dob) {
        super(id);
        this._tag = tag;
        this._dob = dob;
        this._username = username;
    }
    /**
     * age()
     *
     * gets the age of the user.
     */
    age() {
        const now = core_1.DateTime.Now();
        const age = core_1.Duration.FromDateTimeDifference(now, this.dob());
        const ageInYears = Math.floor(age.inYears());
        return Math.abs(ageInYears);
    }
    /**
     * dob()
     *
     * gets the Date of Birth.
     */
    dob() {
        return this._dob;
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
    serializeData() {
        return JSON.stringify({
            age: this.age().toString(),
            dob: this.dob().toString(),
            tag: this.tag().serialize(),
        });
    }
    /**
     * setUsername()
     *
     * sets the username.
     * @param username the username to set.
     */
    setUsername(username) {
        this._username = username;
        this.commitStateChanges();
    }
    /**
     * tag()
     *
     * gets the user tag.
     */
    tag() {
        return this._tag;
    }
    /**
     * username()
     *
     * gets the username.
     */
    username() {
        return this._username;
    }
}
__decorate([
    (0, common_1.State)(),
    __metadata("design:type", values_well_1.Tag)
], User.prototype, "_tag", void 0);
__decorate([
    (0, common_1.State)(),
    __metadata("design:type", core_1.DateTime)
], User.prototype, "_dob", void 0);
__decorate([
    (0, common_1.State)(),
    __metadata("design:type", values_well_1.Username)
], User.prototype, "_username", void 0);
exports.User = User;
