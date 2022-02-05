"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@domeniere/framework");
class ConversationModule extends framework_1.Module {
    constructor() {
        super('conversation');
    }
    createdBindings() {
        // register module bindings here.
    }
}
exports.default = ConversationModule;
// module well exports go here.
