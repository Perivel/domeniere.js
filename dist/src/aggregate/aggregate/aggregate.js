import { InvalidArgumentException } from "foundation";
export class Aggregate {
    constructor(root) {
        if (!root) {
            throw new InvalidArgumentException("An aggregate's root cannot be undefined.");
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
            throw new InvalidArgumentException('An aggregate root cannot be undefined.');
        }
        this._root = root;
    }
}
