"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allcars_1 = __importDefault(require("../model/allcars"));
const purchasedcar_1 = __importDefault(require("../model/purchasedcar"));
const staffs_1 = __importDefault(require("../model/staffs"));
const validator_1 = __importDefault(require("./validator"));
class services {
    static async addPurchasedCars(car) {
        const { error, value } = validator_1.default.PurchasedCarValidator.validate(car);
        if (error)
            throw new Error("invalid Data" + error);
        const purchasedCar = await new purchasedcar_1.default(value).save();
        return purchasedCar;
    }
    static async addNewCar(car) {
        const { error, value } = validator_1.default.AllCarValidator.validate(car);
        if (error)
            throw new Error("invalid Data" + error);
        const newCar = await new allcars_1.default(value).save();
        return newCar;
    }
    static async addStaff(staff) {
        const { error, value } = validator_1.default.StaffValidator.validate(staff);
        if (error)
            throw new Error("invalid Data" + error);
        const newStaff = await new staffs_1.default(value).save();
        return newStaff;
    }
    static async updatePurchasedCars(update) {
        const { error, value } = validator_1.default.PurchasedCarUpdateValidator.validate(update);
        if (error)
            throw new Error("invalid Data" + error);
        const updated = await purchasedcar_1.default.findByIdAndUpdate({ _id: update.id }, {
            $set: {
                ...update,
            },
        });
        return updated;
    }
    static async updateAllCars(car) {
        const { error, value } = validator_1.default.AllCarUpdateValidator.validate(car);
        if (error)
            throw new Error("invalid Data" + error);
        const updatedcars = await allcars_1.default.findByIdAndUpdate({ _id: car.id }, {
            $set: {
                ...value,
            },
        });
        return updatedcars;
    }
    static async updatestaff(staff) {
        const { error, value } = validator_1.default.StaffUpdateValidator.validate(staff);
        if (error)
            throw new Error("invalid Data" + error);
        const newstaff = await staffs_1.default.findByIdAndUpdate({ _id: value.id }, {
            $set: {
                ...value,
            },
        });
        return newstaff;
    }
    static async getAllPurchasedCars() {
        return await purchasedcar_1.default.find();
    }
    static async getAllCars() {
        return await allcars_1.default.find();
    }
    static async getAllStaff() {
        return await staffs_1.default.find();
    }
    static async purchasedCarByColorOrType(arg) {
        const car = await purchasedcar_1.default.find({
            $or: [{ type: arg.type }, { color: arg.color }],
        });
        return car;
    }
    static async allCarsByType_condition_price(arg) {
        const car = await allcars_1.default.find({
            $or: [{ type: arg.type }, { condition: arg.condition }, { price: arg.price }],
        });
        return car;
    }
    static async staffByPosition_name(arg) {
        const staff = await staffs_1.default.find({
            $or: [
                { position: arg.position }, { name: arg.name }
            ]
        });
        return staff;
    }
    static async getAllData() {
        const PurchasedCars = await purchasedcar_1.default.find();
        const AllCars = await allcars_1.default.find();
        const staffs = await staffs_1.default.find();
        return { PurchasedCars, AllCars, staffs };
    }
}
exports.default = services;
