"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("../schema/schema");
const services_1 = __importDefault(require("../service/services"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        purchasedCars: {
            type: new graphql_1.GraphQLList(schema_1.purchasedCarsType),
            resolve(parent, args) {
                return services_1.default.getAllPurchasedCars();
            },
        },
        allCars: {
            type: new graphql_1.GraphQLList(schema_1.allCarType),
            resolve(_parent, _args) {
                return services_1.default.getAllCars();
            },
        },
        staffs: {
            type: new graphql_1.GraphQLList(schema_1.staffType),
            resolve(_parent, _args) {
                return services_1.default.getAllStaff();
            },
        },
        purchasedCarsType_Color: {
            type: new graphql_1.GraphQLList(schema_1.purchasedCarsType),
            args: { color: { type: graphql_1.GraphQLString }, type: { type: graphql_1.GraphQLString } },
            resolve(_parent, args) {
                return services_1.default.purchasedCarByColorOrType(args);
            },
        },
        allCarsByType_Condition_Price: {
            type: new graphql_1.GraphQLList(schema_1.allCarType),
            args: {
                type: { type: graphql_1.GraphQLString },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLString },
            },
            resolve(_parent, args) {
                return services_1.default.allCarsByType_condition_price(args);
            },
        },
        staffByName_Position: {
            type: new graphql_1.GraphQLList(schema_1.staffType),
            args: {
                position: { type: graphql_1.GraphQLString },
                name: { type: graphql_1.GraphQLString },
            },
            resolve(_parent, args) {
                return services_1.default.staffByPosition_name(args);
            },
        },
        allData: {
            type: schema_1.alldataType,
            resolve(_parent, _args) {
                return services_1.default.getAllData();
            },
        },
    },
});
exports.default = RootQuery;
