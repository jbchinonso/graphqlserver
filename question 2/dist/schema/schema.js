"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alldataType = exports.staffType = exports.allCarType = exports.purchasedCarsType = void 0;
const graphql_1 = require("graphql");
const purchasedCarsType = new graphql_1.GraphQLObjectType({
    name: "PurchasedCars",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        type: { type: graphql_1.GraphQLString },
        modelNumber: { type: graphql_1.GraphQLString },
        saleDate: { type: graphql_1.GraphQLString },
        buyer: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLString },
    }),
});
exports.purchasedCarsType = purchasedCarsType;
const allCarType = new graphql_1.GraphQLObjectType({
    name: "AllCars",
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        Name: { type: graphql_1.GraphQLString },
        color: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        amount: { type: graphql_1.GraphQLInt },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
    }),
});
exports.allCarType = allCarType;
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
exports.staffType = staffType;
const alldataType = new graphql_1.GraphQLObjectType({
    name: "alldata",
    fields: () => ({
        PurchasedCars: { type: new graphql_1.GraphQLList(purchasedCarsType) },
        AllCars: { type: new graphql_1.GraphQLList(allCarType) },
        staffs: { type: new graphql_1.GraphQLList(staffType) },
    }),
});
exports.alldataType = alldataType;
