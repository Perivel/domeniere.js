import { Query } from "../../../src/service/service.module";


export abstract class HashStringQuery extends Query {

    constructor() {
        super();
    }

    public abstract execute(str: string): Promise<string>;
}

export class RegularHashQuery extends HashStringQuery {
    constructor() {
        super();
    }

    public async execute(str: string): Promise<string> {
        return str;
    }
}