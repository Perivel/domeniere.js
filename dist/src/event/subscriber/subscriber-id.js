"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberId = void 0;
const foundation_1 = require("foundation");
class SubscriberId extends foundation_1.Id {
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
exports.SubscriberId = SubscriberId;
