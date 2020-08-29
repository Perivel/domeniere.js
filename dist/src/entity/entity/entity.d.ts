import { EntityInterface } from "./entity.interface";
import { Identifier } from "../../common/interfaces/identifier.interface";
export declare abstract class Entity implements EntityInterface {
    private _id;
    constructor(id: Identifier);
    abstract equals(suspect: any): boolean;
    id(): Identifier;
    protected setId(id: Identifier): void;
}
//# sourceMappingURL=entity.d.ts.map