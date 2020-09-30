"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchasedCarsSchema = new mongoose_1.default.Schema({
    type: String,
    modelNumber: { type: String, unique: true },
    saleDate: { type: Date, default: Date.now },
    buyer: String,
    color: String
});
const PurchasedCarModel = mongoose_1.default.model("purchasedcar", purchasedCarsSchema);
