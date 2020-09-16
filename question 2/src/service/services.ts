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
    const { error, value } = Validator.PurchasedCarUpdateValidator.validate(update);
    if (error) throw new Error("invalid Data" + error);
    const updated = PurchasedCarModel.findByIdAndUpdate({ _id: update.id },
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
    const updatedcars = allcarsModel.findByIdAndUpdate( { _id: car.id },
      {
        $set: {
          ...value,
        },
      }
    );
    return updatedcars;
  }
    
    
  static async updatestaff(staff:Istaff) {
    const { error, value } = Validator.StaffUpdateValidator.validate(staff)
      if (error) throw new Error("invalid Data" + error);
      const newstaff = staffModel.findByIdAndUpdate({ _id: value.id },
        {
          $set: {
            ...value,
          },
        }
      );
      return newstaff;

}    
    
    

}

export default services;
