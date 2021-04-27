import { Id } from "@perivel/foundation";
import { SubscriberIdInterface } from "./subscriber-id.interface";
/**
 * SubscriberId
 *
 * represents a unique id for an event subscriber.
 */
export declare class SubscriberId extends Id implements SubscriberIdInterface {
    constructor(value: string);
    /**
     * equals()
     *
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */
    equals(suspect: any): boolean;
    id(): string;
    serialize(): string;
}
//# sourceMappingURL=subscriber-id.d.ts.map