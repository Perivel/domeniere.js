import { Module } from '@domeniere/framework';


export default class ConversationModule extends Module {
    constructor() {
        super('conversation');
    }

    protected createdBindings() {
        // register module bindings here.
    }
}

// module well exports go here.
export * from "./values/values.well";
export * from "./exceptions/exceptions.well";
export * from "./entities/entities.well";
export * from "./aggregates/aggregates.well";