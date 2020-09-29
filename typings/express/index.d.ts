import mongoose from 'mongoose'
export interface Iuser extends mongoose.Document {
  email: string;
    password: string;
    token: string;
    login: Function;
}



interface Iorganization {
  _id?: string;
  organization: string;
  createdAt?: string;
  updatedAt?: [string];
  products: string;
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: [string];
}