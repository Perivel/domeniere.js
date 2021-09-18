"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataFactory = void 0;
const factory_1 = require("@domeniere/factory");
const data_well_1 = require("../../data/data.well");
class UserDataFactory extends factory_1.AbstractFactory {
    constructor() {
        super();
    }
    createFromUserObject(user) {
        const data = new data_well_1.UserData();
        data.id = user.id().id();
        data.first_name = user.username().first();
        data.last_name = user.username().last();
        data.nickname = user.nickname().toString();
        return data;
    }
}
exports.UserDataFactory = UserDataFactory;
