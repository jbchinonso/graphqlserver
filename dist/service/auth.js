"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_1 = __importDefault(require("../service/service"));
dotenv_1.default.config();
const secret = process.env.secret;
class Auth {
    static async verify(context) {
        const token = context.headers["x-access-token"];
        if (!token)
            throw new Error("Token is not provided");
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await service_1.default.getUserByEmail(decoded._doc.email);
        if (!user)
            throw new Error("The token you provided is invalid");
    }
}
exports.default = Auth;
