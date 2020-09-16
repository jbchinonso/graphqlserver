import mongoose from "mongoose"

const purchasedCarsSchema = new mongoose.Schema({
    type: String,
    modelNumber: {type:String, unique: true},
    saleDate: {type:Date, default: Date.now},
    buyer: String,
    color: String
})

const PurchasedCarModel = mongoose.model("purchasedcar", purchasedCarsSchema)

export default PurchasedCarModel