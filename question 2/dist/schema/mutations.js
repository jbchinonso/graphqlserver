"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const staffs_1 = __importDefault(require("../model/staffs"));
const services_1 = __importDefault(require("../service/services"));
const schema_1 = require("../schema/schema");
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPurchasedCars: {
            type: schema_1.purchasedCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            resolve(_parent, args) {
                const purchasedCar = services_1.default.addPurchasedCars(args);
                return purchasedCar;
            },
        },
        addToAllCars: {
            type: schema_1.allCarType,
            args: {
                id: { type: graphql_1.GraphQLID },
                Name: { type: graphql_1.GraphQLString },
                type: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
            },
            resolve(_parent, args) {
                return services_1.default.addNewCar(args);
            },
        },
        addStaff: {
            type: schema_1.staffType,
            args: {
                name: { type: graphql_1.GraphQLString },
                position: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLInt },
                homeAddress: { type: graphql_1.GraphQLString },
            },
            resolve(_parent, args) {
                return services_1.default.addStaff(args);
            },
        },
        updatePurchasedCars: {
            type: schema_1.purchasedCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            resolve(_parent, args) {
                return services_1.default.updatePurchasedCars(args);
            },
        },
        updateAllCars: {
            type: schema_1.allCarType,
            args: {
                id: { type: graphql_1.GraphQLID },
                Name: { type: graphql_1.GraphQLString },
                type: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
            },
            resolve(_parent, args) {
                return services_1.default.updateAllCars(args);
            },
        },
        updateStaff: {
            type: schema_1.staffType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                position: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLInt },
                homeAddress: { type: graphql_1.GraphQLString },
            },
            resolve(_parent, args) {
                const staff = staffs_1.default.findByIdAndUpdate({ _id: args.id }, {
                    $set: {
                        ...args,
                    },
                });
                return staff;
            },
        },
    },
});
exports.default = mutation;
