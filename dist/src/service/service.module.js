"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Command = exports.DomainService = void 0;
var domain_service_1 = require("./service/domain.service");
Object.defineProperty(exports, "DomainService", { enumerable: true, get: function () { return domain_service_1.DomainService; } });
var command_1 = require("./command/command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return command_1.Command; } });
var query_1 = require("./query/query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return query_1.Query; } });
