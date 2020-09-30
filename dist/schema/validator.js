"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = exports.updateValidator = exports.organizationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.organizationValidator = joi_1.default.object({
    id: joi_1.default.string(),
    organization: joi_1.default.string().min(3).required(),
    products: joi_1.default.array().items(joi_1.default.string()).required(),
    marketValue: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    ceo: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    noOfEmployees: joi_1.default.number().required(),
    employees: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.updateValidator = joi_1.default.object({
    id: joi_1.default.string().required(),
    organization: joi_1.default.string().min(3),
    products: joi_1.default.array().items(joi_1.default.string()),
    marketValue: joi_1.default.string(),
    address: joi_1.default.string(),
    ceo: joi_1.default.string(),
    country: joi_1.default.string(),
    noOfEmployees: joi_1.default.number(),
    employees: joi_1.default.array().items(joi_1.default.string()),
});
exports.userValidator = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
}).with("email", "password");
