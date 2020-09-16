import mongoose from "mongoose"

const allcarsSchema = new mongoose.Schema({
    Name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number,
})

const allcarsModel = mongoose.model("allcar", allcarsSchema)

export default allcarsModel