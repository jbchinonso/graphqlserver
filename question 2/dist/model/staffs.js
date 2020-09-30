"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const staffSchema = new mongoose_1.default.Schema({
    name: String,
    position: String,
    salary: Number,
    homeAddress: String
});
const staffModel = mongoose_1.default.model("staff", staffSchema);
exports.default = staffModel;
