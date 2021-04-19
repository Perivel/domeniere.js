"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const domain_service_1 = require("../service/domain.service");
/**
 * Command
 *
 * A Command is used to update data. Commands should be tasked-based, instead of data centric.
 *
 */
class Command extends domain_service_1.DomainService {
    constructor() {
        super();
    }
}
exports.Command = Command;
