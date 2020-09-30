"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Organization = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const organizationSchema = new mongoose_1.default.Schema({
    organization: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    products: [String],
    marketValue: String,
    address: String,
    ceo: String,
    country: String,
    noOfEmployees: Number,
    employees: [String],
});
exports.Organization = mongoose_1.default.model('organization', organizationSchema);
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: String,
});
// userSchema.static({
//   async login(email: string, password: string) {
//     let user = await this.findOne(email);
//     if (user) {
//       let isValid = bcrypt.compare(password, user.password);
//       if (isValid) return user;
//     }
//     throw new Error("Invalid Username or Password")
//   }
// })
exports.User = mongoose_1.default.model("user", userSchema);
