"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedAggregate = exports.Aggregate = void 0;
// exports the API.
var aggregate_1 = require("./aggregate/aggregate");
Object.defineProperty(exports, "Aggregate", { enumerable: true, get: function () { return aggregate_1.Aggregate; } });
var timestamped_aggregate_1 = require("./timestamped-aggregate/timestamped-aggregate");
Object.defineProperty(exports, "TimestampedAggregate", { enumerable: true, get: function () { return timestamped_aggregate_1.TimestampedAggregate; } });
