"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventId = void 0;
const foundation_1 = require("foundation");
/**
 * DoainEventId
 *
 * DomainEventId represents the domain event id.
 */
class DomainEventId extends foundation_1.Id {
    constructor(value) {
        super(value);
    }
    /**
     * Generate()
     *
     * generate creates a random DomainEventId.
     */
    static Generate() {
        return new DomainEventId(foundation_1.UUID.V4().id());
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
}
exports.DomainEventId = DomainEventId;
