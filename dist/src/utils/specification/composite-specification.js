"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeSpecification = void 0;
const and_specification_1 = require("./and-specification");
const and_not_specification_1 = require("./and-not-specification");
const or_specification_1 = require("./or-specification");
const or_not_specification_1 = require("./or-not-specification");
class CompositeSpecification {
    constructor() { }
    and(other) {
        return new and_specification_1.AndSpecification(this, other);
    }
    andNot(other) {
        return new and_not_specification_1.AndNotSpecification(this, other);
    }
    or(other) {
        return new or_specification_1.OrSpecification(this, other);
    }
    orNot(other) {
        return new or_not_specification_1.OrNotSpecification(this, other);
    }
}
exports.CompositeSpecification = CompositeSpecification;
