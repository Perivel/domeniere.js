"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventId = void 0;
const swindle_1 = require("swindle");
/**
 * DoainEventId
 *
 * DomainEventId represents the domain event id.
 */
class DomainEventId extends swindle_1.Id {
    constructor(value) {
        super(value);
    }
    /**
     * Generate()
     *
     * generate creates a random DomainEventId.
     */
    static Generate() {
        return new DomainEventId(swindle_1.UUID.V4().id());
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof DomainEventId) {
            const other = suspect;
            return this.id() === other.id();
        }
        return isEqual;
    }
    /**
     * id()
     *
     * id() gets the value of the Domain event id.
     */
    id() {
        return super.id();
    }
    serialize() {
        return this.id();
    }
}
exports.DomainEventId = DomainEventId;
//# sourceMappingURL=domain-event-id.js.map