import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Organization, User } from "../model/schecma";
import {
  organizationValidator,
  updateValidator,
  userValidator,
} from "../schema/validator";
import {Iorganization, Iuser} from '../../typings/express'

dotenv.config();
const secret = process.env.secret as string


class services {

  static async register(user: { email: string; password: string }) {
    const { error, value } = userValidator.validate(user);
    if (error) return `Input Error ${error}`;
    const existingUser = await User.findOne({ email: value.email });

    if (existingUser) return `${value.email} has been registerd`;

    const hashpPassword = bcrypt.hashSync(
      value.password,
      bcrypt.genSaltSync(8)
    );
    value.password = hashpPassword;
    const newUser = new User(value);
      return await newUser.save();
      
  }

    
  static async login(user: Iuser) {
    const { error, value } = userValidator.validate(user);
    if (error) return `Input Error ${error}`;

    const person = await User.findOne({ email: value.email });
    if (!person) return new Error("Invalid credientials");

    if (!bcrypt.compareSync(value.password, person.password)) {
      return new Error("Invalid credientials");
    }
    const token = jwt.sign({ ...person }, secret, { expiresIn: "1h" });
      person.token = token;
      
    return {payload:person, token};
  };

    
    
  static async organization(id: string){
    return Organization.findById({ _id: id });
  };

    
  static async organizations(){
    return Organization.find();
  };

    
  static async createOrganization(organization: Iorganization){
    const { error, value } = organizationValidator.validate(organization);
    if (error) return error;
    let comapany = new Organization(value);
    return await comapany.save();
  };

    
  static async deleteOrganization (id: string){
    return await Organization.findByIdAndRemove({ _id: id });
  };

    
  static async updateOrganization(organization: Iorganization){
    const { error, value } = updateValidator.validate(organization);
    if (error) return error;
    return await Organization.findOneAndUpdate(
      { _id: value.id },
      {
        $set: {
          updatedAt: new Date().toISOString(),
          ...value,
        },
      }
    );
  };
}

export default services

