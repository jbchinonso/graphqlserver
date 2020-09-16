import mongoose from "mongoose"

const staffSchema = new mongoose.Schema({
    name:String,
    position:String,
    salary:Number,
    homeAddress:String
})

const staffModel = mongoose.model("staff", staffSchema)

export default staffModel