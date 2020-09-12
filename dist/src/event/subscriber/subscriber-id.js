import { Id } from "foundation";
export class SubscriberId extends Id {
    constructor(value) {
        super(value);
    }
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
}
