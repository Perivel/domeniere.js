/**
 * a custom property decriptor designed to take in only event responder function signitures.
 */
import { EventHandler } from "../subscriber/event-handler.type";
export interface EventDescriptor extends PropertyDescriptor {
    value?: EventHandler;
}
//# sourceMappingURL=event-decryptor.d.ts.map