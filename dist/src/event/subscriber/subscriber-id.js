"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberId = void 0;
const swindle_1 = require("swindle");
/**
 * SubscriberId
 *
 * represents a unique id for an event subscriber.
 */
class SubscriberId extends swindle_1.Id {
    constructor(value) {
        super(value);
    }
    /**
     * equals()
     *
     * equals() compares the instance to the suspect, to determine if they are equal.
     * @param suspect The suspect to be compared.
     */
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof SubscriberId) {
            const other = suspect;
            isEqual = this.id() === other.id();
        }
        return isEqual;
    }
    id() {
        return super.id();
    }
    serialize() {
        return this.id();
    }
}
exports.SubscriberId = SubscriberId;
//# sourceMappingURL=subscriber-id.js.map