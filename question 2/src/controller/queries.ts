import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { Icar, IpurchasedCar, Istaff } from "../../typings/express"

import { purchasedCarsType, allCarType, staffType } from "../schema/schema"
import services from "../service/services"

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    purchasedCars: {
      type: new GraphQLList(purchasedCarsType),
      resolve(parent, args) {
        return services.getAllPurchasedCars();
      },
    },

    allCars: {
      type: new GraphQLList(allCarType),
      resolve(_parent, _args) {
        return services.getAllCars();
      },
    },

    staffs: {
      type: new GraphQLList(staffType),
      resolve(_parent, _args) {
        return services.getAllStaff();
      },
    },

    purchasedCarsType_Color: {
      type: new GraphQLList(purchasedCarsType),
      args: { color: { type: GraphQLString }, type: { type: GraphQLString } },
      resolve(_parent, args) {
        return services.purchasedCarByColorOrType(args as IpurchasedCar);
      },
    },

    allCarsByType_Condition_Price: {
      type: new GraphQLList(allCarType),
      args: { type: { type: GraphQLString }, condition: { type: GraphQLString }, price:{type: GraphQLString} },
        resolve(_parent, args) {
          return services.allCarsByType_condition_price(args as Icar)
      },
      },
    
      staffByName_Position: {
          type: staffType,
          args: { position: { type: GraphQLString }, name: { type: GraphQLString } },
          resolve(_parent, args) {
              return services.staffByPosition_name(args as Istaff)
          }
    }
  },
});

export default RootQuery