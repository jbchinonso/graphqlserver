import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLSchema,
} from "graphql";
import { Iorganization, Iuser } from "../../typings/express";
import service from "../service/service"
import Auth from "../service/auth"

const organizationField = {
  id: { type: GraphQLID },
  organization: { type: GraphQLString },
  createdAt: { type: GraphQLString },
  updatedAt: { type: GraphQLString },
  products: { type: new GraphQLList(GraphQLString)},
  marketValue: { type: GraphQLString },
  address: { type: GraphQLString },
  ceo: { type: GraphQLString },
  country: { type: GraphQLString },
  noOfEmployees: { type: GraphQLInt },
  employees: { type: new GraphQLList(GraphQLString) },
};

const organizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => (organizationField),
});

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    // email: { type: new GraphQLNonNull(GraphQLString) },
    payload: {
      type: new GraphQLObjectType({
        name: "payload",
        fields: () => ({
          email: { type: new GraphQLNonNull(GraphQLString) },
        }),
      }),
    },
    token: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    organization: {
      type: organizationType,
      args: { id: { type: GraphQLID } },
      async resolve(_parent, args, context) {
       await Auth.verify(context);
        return service.organization(args.id)
      },
    },

    organizations: {
      type: new GraphQLList(organizationType),
      async resolve(_parent, args, context) {
       await Auth.verify(context);
        return service.organizations();
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganization: {
      type: organizationType,
      args: organizationField,
      async resolve(_parent, args, context) {
        await Auth.verify(context);
        return service.createOrganization(args as Iorganization);
      },
    },

    removeOrganization: {
      type: organizationType,
      args: { id: { type: GraphQLID } },
      async resolve(_parent, args, context) {
       await Auth.verify(context);
        return service.deleteOrganization(args.id)
      },
    },

    updateOrganization: {
      type: organizationType,
      args: organizationField,
      async resolve(_parent, args, context) {
        await Auth.verify(context);
        return service.updateOrganization(args as Iorganization)
      },
    },

    addUser: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = { email: args.email, password: args.password };
        const newuser = service.register(user);
        return newuser;
      },
    },

    login: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args, context) {
        const user = service.login({ ...args } as Iuser);
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

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
