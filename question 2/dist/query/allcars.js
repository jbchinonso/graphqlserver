"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("../schema/schema");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        purchasedCars: {
            type: schema_1.purchasedCarsType,
            resolve(parent, args) {
            }
        }
    }
});
