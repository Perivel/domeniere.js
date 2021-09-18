import { Domain } from "@domeniere/domain";
import "reflect-metadata";
import { EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, SUBDOMAIN_METADATA_KEY } from "../constants";
import { EventRegistrationCallbackFn } from "../events/event-registration-callback.type";

/**
 * Subdomain
 * 
 * The Subdomain decorator specifies the subdomain an Api will be working with.
 */

export function Subdomain(path: string) {
    return function(target: Object) {
        // create the subdomain
        Domain.CreateSubdomain(path);

        // set the subdomain metadata
        Reflect.defineMetadata(SUBDOMAIN_METADATA_KEY, path, target);

        // register the event handlers.
        if (Reflect.hasMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target)) {
            const registrations: EventRegistrationCallbackFn[] = Reflect.getMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target);
            registrations.forEach(register => register(path));
        }
    }
}