import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import allcarsModel from "../model/allcars";
import PurchasedCarModel from "../model/purchasedcar";
import staffModel from "../model/staffs";

import services from "../service/services"

import {Icar, IpurchasedCar, Istaff} from "../../typings/express"

import { purchasedCarsType, allCarType, staffType } from "../schema/schema";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPurchasedCars: {
      type: purchasedCarsType,
      args: {
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        modelNumber: { type: GraphQLString },
        saleDate: { type: GraphQLString },
        buyer: { type: GraphQLString },
        color: { type: GraphQLString },
      },
      resolve(_parent, args) {
          const purchasedCar = services.addPurchasedCars(args as IpurchasedCar)
        return purchasedCar;
      },
    },

    addToAllCars: {
      type: allCarType,
      args: {
        id: { type: GraphQLID },
        Name: { type: GraphQLString },
        type: { type: GraphQLString },
        productionDate: { type: GraphQLString },
        color: { type: new GraphQLList(GraphQLString) },
        amount: { type: GraphQLInt },
        condition: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve(_parent, args) {
        return services.addNewCar(args as Icar);
      },
    },

    addStaff: {
      type: staffType,
      args: {
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        salary: { type: GraphQLInt },
        homeAddress: { type: GraphQLString },
      },
      resolve(_parent, args) {
        return services.addStaff(args as Istaff)
      },
    },

    updatePurchasedCars: {
      type: purchasedCarsType,
      args: {
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        modelNumber: { type: GraphQLString },
        saleDate: { type: GraphQLString },
        buyer: { type: GraphQLString },
        color: { type: GraphQLString },
      },

      resolve(_parent, args) {
       return services.updatePurchasedCars(args as IpurchasedCar)
      },
    },

    updateAllCars: {
      type: allCarType,
      args: {
        id: { type: GraphQLID },
        Name: { type: GraphQLString },
        type: { type: GraphQLString },
        productionDate: { type: GraphQLString },
        color: { type: new GraphQLList(GraphQLString) },
        amount: { type: GraphQLInt },
        condition: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      resolve(_parent, args) {
        return services.updateAllCars(args as Icar)
      },
    },

    updateStaff: {
      type: staffType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        salary: { type: GraphQLInt },
        homeAddress: { type: GraphQLString },
      },
      resolve(_parent, args) {
        const staff = staffModel.findByIdAndUpdate(
          { _id: args.id },
          {
            $set: {
              ...args,
            },
          }
        );
        return staff;
      },
    },
  },
});

export default mutation;
