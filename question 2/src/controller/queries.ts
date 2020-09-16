import { GraphQLObjectType } from "graphql"

import { purchasedCarsType, allCarType, staffType } from "../schema/schema"

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        purchasedCars: {
            type:purchasedCarsType,
            resolve(parent, args) {
                
            }
        }






        
    }
})

export default RootQuery