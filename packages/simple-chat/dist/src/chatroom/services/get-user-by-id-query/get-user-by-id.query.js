"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdQuery = void 0;
const service_1 = require("@domeniere/service");
class GetUserByIdQuery extends service_1.Query {
    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
    }
    async execute(id) {
        try {
            return await this.userRepository.getById(id);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.GetUserByIdQuery = GetUserByIdQuery;
