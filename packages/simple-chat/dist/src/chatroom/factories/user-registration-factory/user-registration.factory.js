"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistrationFactory = void 0;
const factory_1 = require("@domeniere/factory");
const values_well_1 = require("../../values/values.well");
class UserRegistrationFactory extends factory_1.AbstractFactory {
    constructor() {
        super();
    }
    createFromData(data) {
        return new values_well_1.UserRegistration(new values_well_1.Username(data.first_name, data.last_name), new values_well_1.Nickname(data.nickname));
    }
}
exports.UserRegistrationFactory = UserRegistrationFactory;
