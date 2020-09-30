"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const staffType = new graphql_1.GraphQLObjectType({
    name: "Staff",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLString },
        homeAddress: { type: graphql_1.GraphQLString }
    })
});
exports.default = staffType;
