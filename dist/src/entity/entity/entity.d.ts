import { EntityInterface } from "./entity.interface";
import { Id } from "foundation";
export declare abstract class Entity implements EntityInterface {
    private _id;
    constructor(id: Id);
    abstract equals(suspect: any): boolean;
    id(): Id;
    protected setId(id: Id): void;
}
//# sourceMappingURL=entity.d.ts.map