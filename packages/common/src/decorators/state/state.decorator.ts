import { Aggregate, Entity } from "@domeniere/framework";

/**
 * State() Decorator.
 *
 * The State() property decorator indicates that the property should be 
 * part of the local state.
 */

export function State() {
    return function(target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            configurable: false,
            enumerable: false,
            get: function() {
                return (this as Entity|Aggregate).__state__.get(propertyKey);
            },
            set: function(value: any) {
                const state = (this as Entity|Aggregate).__state__;
                
                if (state.contains(propertyKey)) {
                    state.set(propertyKey, value);
                }
                else {
                    state.initialize(propertyKey, value);
                    state.confirmChanges();
                }
            }
        });
    }
}