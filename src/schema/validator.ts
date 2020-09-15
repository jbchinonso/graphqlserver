import Joi from "joi";

export const organizationValidator = Joi.object({
  id: Joi.string(),
  organization: Joi.string().min(3).required(),
  products: Joi.array().items(Joi.string()).required(),
  marketValue: Joi.string().required(),
  address: Joi.string().required(),
  ceo: Joi.string().required(),
  country: Joi.string().required(),
  noOfEmployees: Joi.number().required(),
  employees: Joi.array().items(Joi.string()).required(),
});


export const updateValidator = Joi.object({
  id: Joi.string().required(),
  organization: Joi.string().min(3),
  products: Joi.array().items(Joi.string()),
  marketValue: Joi.string(),
  address: Joi.string(),
  ceo: Joi.string(),
  country: Joi.string(),
  noOfEmployees: Joi.number(),
  employees: Joi.array().items(Joi.string()),
});


export const userValidator = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
}).with("email", "password");