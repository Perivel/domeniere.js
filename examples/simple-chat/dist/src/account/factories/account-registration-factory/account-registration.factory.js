"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRegistrationFactory = void 0;
const framework_1 = require("@domeniere/framework");
const values_well_1 = require("../../values/values.well");
/**
 * AccountRegistrationFactory
 */
class AccountRegistrationFactory extends framework_1.AbstractFactory {
    constructor() {
        super();
    }
    /**
     * createFromDto()
     *
     * creates an account registration from a DTO.
     * @param source the DTO source to create the registration from.
     */
    createFromDto(source) {
        return new values_well_1.AccountRegistration(new values_well_1.Username(source.username), new values_well_1.Tag(source.tag), source.dob.toUtc());
    }
}
exports.AccountRegistrationFactory = AccountRegistrationFactory;
