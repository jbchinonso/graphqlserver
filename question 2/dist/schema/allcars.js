"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const allCarType = new graphql_1.GraphQLObjectType({
    name: "AllCars",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        modelNumber: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString },
        amount: { type: graphql_1.GraphQLInt },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt }
    })
});
exports.default = allCarType;
