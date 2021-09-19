import { Domain } from "@domeniere/domain";
import "reflect-metadata";
import { EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, SUBDOMAIN_METADATA_KEY } from "../constants";
import { EventRegistrationCallbackFn } from "../events/event-registration-callback.type";

/**
 * Subdomain
 * 
 * The Subdomain decorator specifies the subdomain an Api will be working with.
 */

export function Subdomain(path: string): ClassDecorator {
    return (target) => {
        // create the subdomain
        Domain.CreateSubdomain(path);

        // set the subdomain metadata
        Reflect.defineMetadata(SUBDOMAIN_METADATA_KEY, path, target.prototype);

        // register the event handlers.
        console.log(`\Registering listeners...\n`);
        if (Reflect.hasMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target.prototype)) {
            const registrations: EventRegistrationCallbackFn[] = Reflect.getMetadata(EVENT_REGISTRATION_CALLBACK_ARRAY_METADATA_KEY, target.prototype);
            registrations.forEach(register => register(path));
            console.log(registrations);
        }
        else {
            console.log("No Subscriptions to register.");
        }
    }
}