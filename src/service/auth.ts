import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import dotenv from "dotenv"
import services from "../service/service"

dotenv.config()

const secret = process.env.secret as string
type decoded = {
  _doc: { [key: string]: string };
  secret: string;
};

class Auth {
    static async verify(context: any) {
        
        const token = context.headers["x-access-token"];
        if (!token) throw new Error("Token is not provided");
    
        const decoded = jwt.verify(token, secret) as decoded

          const user = await services.getUserByEmail(decoded._doc.email);

          if (!user) throw new Error("The token you provided is invalid" );
          
        
        
    }
}



export default Auth