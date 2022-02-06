"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountFactory = void 0;
const framework_1 = require("@domeniere/framework");
const aggregates_well_1 = require("../../aggregates/aggregates.well");
const entities_well_1 = require("../../entities/entities.well");
class AccountFactory extends framework_1.AbstractFactory {
    constructor() {
        super();
    }
    /**
     * createFromRegistration()
     *
     * creates an account from a registration object.
     * @param registration the registration to create the account from.
     * @param id the user id to assign to the account.
     */
    createFromRegistration(registration, id) {
        return new aggregates_well_1.Account(new entities_well_1.User(id, registration.username(), registration.tag(), registration.dob()));
    }
}
exports.AccountFactory = AccountFactory;
