"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subdomain = void 0;
const domain_1 = require("@domeniere/domain");
require("reflect-metadata");
const constants_1 = require("../constants");
/**
 * Subdomain
 *
 * The Subdomain decorator specifies the subdomain an Api will be working with.
 */
function Subdomain(path) {
    return (target) => {
        // create the subdomain
        domain_1.Domain.CreateSubdomain(path);
        // set the subdomain metadata
        Reflect.defineMetadata(constants_1.SUBDOMAIN_METADATA_KEY, path, target.prototype);
        // register the event handlers.
        console.log(`\Registering listeners...\n`);
        if (Reflect.hasMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target.prototype)) {
            const registrations = Reflect.getMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target.prototype);
            registrations.forEach(register => register(path));
            console.log(registrations);
        }
        else {
            console.log("No Subscriptions to register.");
        }
    };
}
exports.Subdomain = Subdomain;
//# sourceMappingURL=subdomain.decorator.js.map