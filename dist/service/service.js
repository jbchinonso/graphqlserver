"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const schecma_1 = require("../model/schecma");
const validator_1 = require("../schema/validator");
dotenv_1.default.config();
const secret = process.env.secret;
class services {
    static async register(user) {
        const { error, value } = validator_1.userValidator.validate(user);
        if (error)
            return `Input Error ${error}`;
        const existingUser = await schecma_1.User.findOne({ email: value.email });
        if (existingUser)
            return `${value.email} has been registerd`;
        const hashpPassword = bcrypt_1.default.hashSync(value.password, bcrypt_1.default.genSaltSync(8));
        value.password = hashpPassword;
        const newUserModel = new schecma_1.User(value);
        const newUser = await newUserModel.save();
        return { payload: newUser };
    }
    static async login(user) {
        const { error, value } = validator_1.userValidator.validate(user);
        if (error)
            return `Input Error ${error}`;
        const person = await schecma_1.User.findOne({ email: value.email });
        if (!person)
            return new Error("Invalid credientials");
        if (!bcrypt_1.default.compareSync(value.password, person.password)) {
            return new Error("Invalid credientials");
        }
        const token = jsonwebtoken_1.default.sign({ ...person }, secret, { expiresIn: "1h" });
        person.token = token;
        return { payload: person, token };
    }
    static async organization(id) {
        return schecma_1.Organization.findById({ _id: id });
    }
    static async getUserByEmail(email) {
        return await schecma_1.User.findOne({ email: email });
    }
    static async organizations() {
        return schecma_1.Organization.find();
    }
    static async createOrganization(organization) {
        const { error, value } = validator_1.organizationValidator.validate(organization);
        if (error)
            return error;
        let comapany = new schecma_1.Organization(value);
        return await comapany.save();
    }
    static async deleteOrganization(id) {
        return await schecma_1.Organization.findByIdAndRemove({ _id: id });
    }
    static async updateOrganization(organization) {
        const { error, value } = validator_1.updateValidator.validate(organization);
        if (error)
            return error;
        return await schecma_1.Organization.findOneAndUpdate({ _id: value.id }, {
            $set: {
                updatedAt: new Date().toISOString(),
                ...value,
            },
        }, { new: true });
    }
}
exports.default = services;
