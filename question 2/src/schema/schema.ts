import {GraphQLID, GraphQLInt, GraphQLString,GraphQLList, GraphQLObjectType } from "graphql";


const purchasedCarsType = new GraphQLObjectType({
  name: "PurchasedCars",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    modelNumber: { type: GraphQLString },
    saleDate: { type: GraphQLString },
    buyer: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});


const allCarType = new GraphQLObjectType({
  name: "AllCars",
  fields: () => ({
    id: { type: GraphQLString },
    Name: { type: GraphQLString },
    color: { type: new GraphQLList(GraphQLString)},
    amount: { type: GraphQLInt },
    condition: { type: GraphQLString },
    price: { type: GraphQLInt },
  }),
});


const staffType = new GraphQLObjectType({
    name: "Staff",
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        salary: { type: GraphQLString },
        homeAddress: {type: GraphQLString}
    })
})

export {purchasedCarsType, allCarType, staffType}