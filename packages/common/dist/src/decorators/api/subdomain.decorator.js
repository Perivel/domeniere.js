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
    return function (target) {
        // create the subdomain
        domain_1.Domain.CreateSubdomain(path);
        // set the subdomain metadata
        Reflect.defineMetadata(constants_1.SUBDOMAIN_METADATA_KEY, path, target);
        // register the event handlers.
        if (Reflect.hasMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target)) {
            const registrations = Reflect.getMetadata(constants_1.EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target);
            registrations.forEach(register => register(path));
        }
    };
}
exports.Subdomain = Subdomain;
//# sourceMappingURL=subdomain.decorator.js.map