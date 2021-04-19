"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextScoped = void 0;
/**
 * ContextScoped decorator
 * @param dependency The dependency key to use
 *
 */
function ContextScoped(dependency) {
    return function (...args) {
        // determine what type of decorator based on arguments.
        switch (args.length) {
            case 3:
                if (typeof args[2] === 'number') {
                    // the third argument is an index.
                    // it is a parameter decorator
                    // return the ContextScopedParameter decorator
                }
                // It is a method decorator
                break;
            case 2:
                /// property decorator
                break;
            case 1:
                // class decorator
                // return the ContextScopedClass decorator
                break;
            default:
                // invalid
                throw new Error("Invalid decorator");
        }
    };
}
exports.ContextScoped = ContextScoped;
