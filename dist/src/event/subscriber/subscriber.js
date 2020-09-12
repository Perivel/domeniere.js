var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Subscriber {
    constructor(id, eventName, priority, label, handler, stopPropogationOnError = false) {
        this._id = id;
        this._eventName = eventName;
        this._handler = handler;
        this._label = label;
        this._priority = priority;
        this._handleAttempts = 0;
        this._stopPropogationOnError = stopPropogationOnError;
    }
    equals(suspect) {
        let isEqual = false;
        if (suspect instanceof Subscriber) {
            const other = suspect;
            isEqual = this.id().equals(other.id()) && this.eventName() === other.eventName();
        }
        return isEqual;
    }
    eventName() {
        return this._eventName;
    }
    handleAttempts() {
        return this._handleAttempts;
    }
    id() {
        return this._id;
    }
    incrementFailedHandleAttempts() {
        this._handleAttempts++;
    }
    label() {
        return this._label;
    }
    handleEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._handler(event);
        });
    }
    priority() {
        return this._priority;
    }
    resetHandleAttempts() {
        this._handleAttempts = 0;
    }
    shouldStopPropogationOnError() {
        return this._stopPropogationOnError;
    }
}
