"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByNicknameQuery = void 0;
const service_1 = require("@domeniere/service");
class GetUserByNicknameQuery extends service_1.Query {
    constructor(repository) {
        super();
        this.userRepository = repository;
    }
    async execute(nickname) {
        try {
            return await this.userRepository.getByNickname(nickname);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.GetUserByNicknameQuery = GetUserByNicknameQuery;
