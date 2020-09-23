"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregate = void 0;
const foundation_1 = require("foundation");
class Aggregate {
    constructor(root) {
        if (!root) {
            throw new foundation_1.InvalidArgumentException("An aggregate's root cannot be undefined.");
        }
        this._root = root;
    }
    equals(suspect) {
        return this.root().equals(suspect);
    }
    identity() {
        return this.root().id();
    }
    root() {
        return this._root;
    }
    setRoot(root) {
        if (!root) {
            throw new foundation_1.InvalidArgumentException('An aggregate root cannot be undefined.');
        }
        this._root = root;
    }
}
exports.Aggregate = Aggregate;
