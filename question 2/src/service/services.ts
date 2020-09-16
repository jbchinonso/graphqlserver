import allcarsModel from "../model/allcars";
import PurchasedCarModel from "../model/purchasedcar";
import staffModel from "../model/staffs";
import Validator from "./validator";

import { Icar, IpurchasedCar, Istaff } from "../../typings/express";

class services {
  static async addPurchasedCars(car: IpurchasedCar) {
    const { error, value } = Validator.PurchasedCarValidator.validate(car);
    if (error) throw new Error("invalid Data" + error);
    const purchasedCar = await new PurchasedCarModel(value).save();
    return purchasedCar;
  }

  static async addNewCar(car: Icar) {
    const { error, value } = Validator.AllCarValidator.validate(car);
    if (error) throw new Error("invalid Data" + error);
    const newCar = await new allcarsModel(value).save();
    return newCar;
  }

  static async addStaff(staff: Istaff) {
    const { error, value } = Validator.StaffValidator.validate(staff);
    if (error) throw new Error("invalid Data" + error);
    const newStaff = await new staffModel(value).save();
    return newStaff;
  }

  static async updatePurchasedCars(update: IpurchasedCar) {
    const { error, value } = Validator.PurchasedCarUpdateValidator.validate(
      update
    );
    if (error) throw new Error("invalid Data" + error);
    const updated = await PurchasedCarModel.findByIdAndUpdate(
      { _id: update.id },
      {
        $set: {
          ...update,
        },
      }
    );
    return updated;
  }

  static async updateAllCars(car: Icar) {
    const { error, value } = Validator.AllCarUpdateValidator.validate(car);
    if (error) throw new Error("invalid Data" + error);
    const updatedcars = await allcarsModel.findByIdAndUpdate(
      { _id: car.id },
      {
        $set: {
          ...value,
        },
      }
    );
    return updatedcars;
  }

  static async updatestaff(staff: Istaff) {
    const { error, value } = Validator.StaffUpdateValidator.validate(staff);
    if (error) throw new Error("invalid Data" + error);
    const newstaff = await staffModel.findByIdAndUpdate(
      { _id: value.id },
      {
        $set: {
          ...value,
        },
      }
    );
    return newstaff;
  }

    static async getAllPurchasedCars() {
       return await PurchasedCarModel.find();    
  }

  static async getAllCars() {
    return await allcarsModel.find();
  }

  static async getAllStaff() {
    return await staffModel.find();
  }

  static async purchasedCarByColorOrType(arg: IpurchasedCar) {
    const car = await PurchasedCarModel.find({
      $or: [{ type: arg.type }, { color: arg.color }],
    });
      
      return car
  }
  static async allCarsByType_condition_price(arg: Icar) {
    const car = await allcarsModel.find({
      $or: [{ type: arg.type }, { condition: arg.condition }, {price: arg.price}],
    });
    return car;
  }
  
    static async staffByPosition_name(arg: Istaff) {
        const staff = await staffModel.find({
            $or: [
                {position: arg.position},{name: arg.name}
            ]
        })

        return staff
    }
    


    static async getAllData() {
        const purchasedCars = await PurchasedCarModel.find();
        const allcars = await allcarsModel.find();
        const staffs = await staffModel.find();

        return { purchasedCars, allcars, staffs };
    }
    
}

export default services;
