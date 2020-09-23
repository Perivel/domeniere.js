import { Query } from './../../../src/service/service.module';

export class DoubleNumberQuery extends Query {

    constructor() {
        super();
    }

    public async execute(x: number): Promise<number> {
        return x * 2;
    }
}