import { Module } from '@domeniere/framework';


export default class AccountModule extends Module {
    constructor() {
        super('account');
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
export * from "./repositories/repositories.well";