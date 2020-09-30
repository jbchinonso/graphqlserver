"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const service_1 = __importDefault(require("../service/service"));
const auth_1 = __importDefault(require("../service/auth"));
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
        // email: { type: new GraphQLNonNull(GraphQLString) },
        payload: {
            type: new graphql_1.GraphQLObjectType({
                name: "payload",
                fields: () => ({
                    email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                }),
            }),
        },
        token: { type: graphql_1.GraphQLString },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        organization: {
            type: organizationType,
            args: { id: { type: graphql_1.GraphQLID } },
            async resolve(_parent, args, context) {
                await auth_1.default.verify(context);
                return service_1.default.organization(args.id);
            },
        },
        organizations: {
            type: new graphql_1.GraphQLList(organizationType),
            async resolve(_parent, args, context) {
                //await Auth.verify(context);
                // console.log("it entered")
                // console.log(context.req)
                return service_1.default.organizations();
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
            async resolve(_parent, args, context) {
                await auth_1.default.verify(context);
                return service_1.default.createOrganization(args);
            },
        },
        removeOrganization: {
            type: organizationType,
            args: { id: { type: graphql_1.GraphQLID } },
            async resolve(_parent, args, context) {
                await auth_1.default.verify(context);
                return service_1.default.deleteOrganization(args.id);
            },
        },
        updateOrganization: {
            type: organizationType,
            args: organizationField,
            async resolve(_parent, args, context) {
                await auth_1.default.verify(context);
                return service_1.default.updateOrganization(args);
            },
        },
        addUser: {
            type: userType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            async resolve(parent, args) {
                const user = { email: args.email, password: args.password };
                return service_1.default.register(user);
            },
        },
        login: {
            type: userType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args, context) {
                const user = service_1.default.login({ ...args });
                return user;
                /**
                 {
                 error: "",
                 payload: [{}],
                 message: '',
                 token: 'sfssf',
                 status: 400
                 }
                 
                 */
            },
        },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
