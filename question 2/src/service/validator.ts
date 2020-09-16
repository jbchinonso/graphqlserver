import Joi from "joi"

class Validator {
 static PurchasedCarValidator = Joi.object({
    id: Joi.string(),
    type: Joi.string().required(),
    modelNumber: Joi.string().required(),
    saleDate: Joi.string(),
    buyer: Joi.string().required(),
    color: Joi.string().required(),
  });

 static AllCarValidator = Joi.object({
    id: Joi.string(),
    Name: Joi.string().required(),
    type: Joi.string().required(),
    productionDate: Joi.string().required(),
    color: Joi.array().items(Joi.string()).required(),
    amount: Joi.number().required(),
    condition: Joi.string().required(),
    price: Joi.number().required(),
  });

 static StaffValidator = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    position: Joi.string().required(),
    salary: Joi.number().required(),
    homeAddress: Joi.string().required(),
  });

 static PurchasedCarUpdateValidator = Joi.object({
    id: Joi.string().required(),
    type: Joi.string(),
    modelNumber: Joi.string(),
    saleDate: Joi.string(),
    buyer: Joi.string(),
    color: Joi.string(),
  });

 static AllCarUpdateValidator = Joi.object({
    id: Joi.string().required(),
    Name: Joi.string(),
    type: Joi.string(),
    productionDate: Joi.string(),
    color: Joi.array().items(Joi.string()),
    amount: Joi.number(),
    condition: Joi.string(),
    price: Joi.number(),
  });

 static StaffUpdateValidator = Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    position: Joi.string(),
    salary: Joi.number(),
    homeAddress: Joi.string(),
  });
}

export default Validator