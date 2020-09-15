import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { Iuser } from "../../typings/express";

const organizationSchema = new mongoose.Schema({
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

export const Organization = mongoose.model('organization', organizationSchema);

const userSchema = new mongoose.Schema({
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

export const User = mongoose.model<Iuser>("user", userSchema);
