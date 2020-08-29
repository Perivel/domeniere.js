import { AggregateInterface } from "./aggregate.interface";
import { Entity } from "../../entity/entity.module";
import { Identifier } from "../../common/common.module";
export declare abstract class Aggregate implements AggregateInterface {
    private _root;
    constructor(root: Entity);
    equals(suspect: any): boolean;
    identity(): Identifier;
    protected root(): Entity;
    protected setRoot(root: Entity): void;
}
//# sourceMappingURL=aggregate.d.ts.map