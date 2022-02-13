import { Module } from '@domeniere/framework';
import { ConversationRepository } from './repositories/repositories.well';


export default class ConversationModule extends Module {
    constructor() {
        super('conversation');
    }

    protected createdBindings() {
        // register module bindings here.
        this.bindRepository(ConversationRepository);
    }
}

// module well exports go here.
export * from "./values/values.well";
export * from "./exceptions/exceptions.well";
export * from "./entities/entities.well";
export * from "./aggregates/aggregates.well";
export * from "./repositories/repositories.well";