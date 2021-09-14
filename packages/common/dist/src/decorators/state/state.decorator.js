"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/**
 * State() Decorator.
 *
 * The State() property decorator indicates that the property should be
 * part of the local state.
 */
function State() {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            enumerable: false,
            get: function () {
                return this.__state__.get(propertyKey);
            },
            set: function (value) {
                const state = this.__state__;
                if (state.contains(propertyKey)) {
                    state.set(propertyKey, value);
                }
                else {
                    state.initialize(propertyKey, value);
                    state.confirmChanges();
                }
            }
        });
    };
}
exports.State = State;
//# sourceMappingURL=state.decorator.js.map