"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccountByTagQuery = void 0;
const framework_1 = require("@domeniere/framework");
const exceptions_well_1 = require("../exceptions/exceptions.well");
/**
 * GetAccountByTagQuery
 *
 * Gets ana account by its tag.
 */
class GetAccountByTagQuery extends framework_1.Query {
    constructor(repository) {
        super();
        this.repository = repository;
    }
    /**
     * execute()
     *
     * executes the operation.
     * @param tag the tag to search for.
     * @returns the account associated with the tag.
     * @throws AccountNotFoundException when the account cannot be found.
     * @throws RepositoryException when there is an error with the repository.
     */
    async execute(tag) {
        let account = null;
        try {
            account = await this.repository.getByTag(tag);
        }
        catch (e) {
            throw new framework_1.RepositoryException(e.message);
        }
        if (account) {
            return account;
        }
        else {
            throw new exceptions_well_1.AccountNotFoundException();
        }
    }
}
exports.GetAccountByTagQuery = GetAccountByTagQuery;
