import { Id, UUID } from "foundation";
export class DomainEventId extends Id {
    constructor(value) {
        super(value);
    }
    static Generate() {
        return new DomainEventId(UUID.V4().id());
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof DomainEventId) {
            const other = suspect;
            return this.id() === other.id();
        }
        return isEqual;
    }
    id() {
        return super.id();
    }
}
