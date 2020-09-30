"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const allcarsSchema = new mongoose_1.default.Schema({
    Name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number,
});
const allcarsModel = mongoose_1.default.model("allcar", allcarsSchema);
exports.default = allcarsModel;
