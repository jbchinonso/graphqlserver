export interface IpurchasedCar {
  id?: string;
  type: string;
  modelNumber: string;
  saleDate?: string;
  buyer: string;
  color: string;
}

interface Icar {
  id?: string;
  Name: string;
  type: string;
  productionDate: string;
  color: [string];
  amount: Number;
  condition: string;
  price: Number;
}

interface Istaff {
  id?: string;
  name: string;
  position: string;
  salary: string;
  homeAddress: string;
}
