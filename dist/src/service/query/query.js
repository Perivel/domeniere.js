"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const domain_service_1 = require("../service/domain.service");
/**
 * Query
 *
 * Query represents a Query. A query retrieves data from a Data source.
 * A query should not modify any kind of data.
 */
class Query extends domain_service_1.DomainService {
    constructor() {
        super();
    }
}
exports.Query = Query;
