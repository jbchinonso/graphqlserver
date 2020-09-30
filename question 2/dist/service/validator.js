"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Validator {
}
Validator.PurchasedCarValidator = joi_1.default.object({
    id: joi_1.default.string(),
    type: joi_1.default.string().required(),
    modelNumber: joi_1.default.string().required(),
    saleDate: joi_1.default.string(),
    buyer: joi_1.default.string().required(),
    color: joi_1.default.string().required(),
});
Validator.AllCarValidator = joi_1.default.object({
    id: joi_1.default.string(),
    Name: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    productionDate: joi_1.default.string().required(),
    color: joi_1.default.array().items(joi_1.default.string()).required(),
    amount: joi_1.default.number().required(),
    condition: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
});
Validator.StaffValidator = joi_1.default.object({
    id: joi_1.default.string(),
    name: joi_1.default.string().required(),
    position: joi_1.default.string().required(),
    salary: joi_1.default.number().required(),
    homeAddress: joi_1.default.string().required(),
});
Validator.PurchasedCarUpdateValidator = joi_1.default.object({
    id: joi_1.default.string().required(),
    type: joi_1.default.string(),
    modelNumber: joi_1.default.string(),
    saleDate: joi_1.default.string(),
    buyer: joi_1.default.string(),
    color: joi_1.default.string(),
});
Validator.AllCarUpdateValidator = joi_1.default.object({
    id: joi_1.default.string().required(),
    Name: joi_1.default.string(),
    type: joi_1.default.string(),
    productionDate: joi_1.default.string(),
    color: joi_1.default.array().items(joi_1.default.string()),
    amount: joi_1.default.number(),
    condition: joi_1.default.string(),
    price: joi_1.default.number(),
});
Validator.StaffUpdateValidator = joi_1.default.object({
    id: joi_1.default.string().required(),
    name: joi_1.default.string(),
    position: joi_1.default.string(),
    salary: joi_1.default.number(),
    homeAddress: joi_1.default.string(),
});
exports.default = Validator;
