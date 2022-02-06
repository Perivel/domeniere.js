"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDataFactory = void 0;
const framework_1 = require("@domeniere/framework");
const data_well_1 = require("../../data/data.well");
class AccountDataFactory extends framework_1.AbstractFactory {
    constructor() {
        super();
    }
    /**
     * createFromAccountObject()
     *
     * creates an account data instance from an Account aggregate.
     * @param object the account object
     */
    createFromAccountObject(object) {
        return new data_well_1.AccountData(object.id().toString(), object.username().toString(), new data_well_1.TagData(object.tag().value()), object.ownerDob(), object.ownerAge(), object.createdOn(), object.updatedOn(), object.deletedOn());
    }
}
exports.AccountDataFactory = AccountDataFactory;
