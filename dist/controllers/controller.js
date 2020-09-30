"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const schecma_1 = require("../model/schecma");
const validator_1 = require("./validator");
const organizationField = {
    id: { type: graphql_1.GraphQLID },
    organization: { type: graphql_1.GraphQLString },
    createdAt: { type: graphql_1.GraphQLString },
    updatedAt: { type: graphql_1.GraphQLString },
    products: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    marketValue: { type: graphql_1.GraphQLString },
    address: { type: graphql_1.GraphQLString },
    ceo: { type: graphql_1.GraphQLString },
    country: { type: graphql_1.GraphQLString },
    noOfEmployees: { type: graphql_1.GraphQLInt },
    employees: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
};
const organizationType = new graphql_1.GraphQLObjectType({
    name: "Organization",
    fields: () => (organizationField),
});
const userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString }
    })
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        organization: {
            type: organizationType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return schecma_1.Organization.findById({ _id: args.id });
            },
        },
        organizations: {
            type: new graphql_1.GraphQLList(organizationType),
            async resolve(parent, args) {
                return await schecma_1.Organization.find();
            },
        },
    },
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addOrganization: {
            type: organizationType,
            args: organizationField,
            async resolve(parent, args) {
                const { error, value } = validator_1.organizationValidator.validate(args);
                if (error)
                    return error;
                let comapany = new schecma_1.Organization(value);
                return await comapany.save();
            },
        },
        removeOrganization: {
            type: organizationType,
            args: { id: { type: graphql_1.GraphQLID } },
            async resolve(parent, args) {
                return await schecma_1.Organization.findByIdAndRemove({ _id: args.id });
            },
        },
        updateOrganization: {
            type: organizationType,
            args: organizationField,
            async resolve(parent, args) {
                const { error, value } = validator_1.updateValidator.validate(args);
                if (error)
                    return error;
                return await schecma_1.Organization.findOneAndUpdate({ _id: value.id }, {
                    $set: {
                        updatedAt: new Date().toISOString(),
                        ...value,
                    },
                });
            },
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
