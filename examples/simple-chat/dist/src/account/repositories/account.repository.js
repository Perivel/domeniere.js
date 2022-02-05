"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const framework_1 = require("@domeniere/framework");
const values_well_1 = require("../values/values.well");
class AccountRepository extends framework_1.IdentityGeneratingRepository {
    constructor() {
        super();
    }
    generateIdentity() {
        return values_well_1.UserId.Generate();
    }
}
exports.AccountRepository = AccountRepository;
