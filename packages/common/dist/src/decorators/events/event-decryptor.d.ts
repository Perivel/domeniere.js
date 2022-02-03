/**
 * a custom property decriptor designed to take in only event responder function signitures.
 */
import { DomainEventHandler } from "@domeniere/framework";
export interface EventDescriptor extends PropertyDescriptor {
    value?: DomainEventHandler<any>;
}
//# sourceMappingURL=event-decryptor.d.ts.map