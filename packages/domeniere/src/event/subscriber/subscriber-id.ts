import { Id } from "@swindle/core";
import { SubscriberIdInterface } from "./subscriber-id.interface";

/**
 * SubscriberId
 * 
 * represents a unique id for an event subscriber.
 */

export class SubscriberId extends Id implements SubscriberIdInterface {

    constructor(value: string) {
        super(value);
    }

    /**
     * equals()
     * 
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */

    public equals(suspect: any): boolean {

        let isEqual = false;

        if (suspect instanceof SubscriberId) {
            const other = suspect as SubscriberId;
            isEqual = this.id() === other.id();
        }

        return isEqual;
    }

    public id(): string {
        return super.id() as string;
    }

    public serialize(): string {
        return this.id();
    }
}