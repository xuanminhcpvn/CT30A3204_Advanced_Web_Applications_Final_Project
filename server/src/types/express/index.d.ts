//have to do this in order to avoid type mismatch 
import { IUser } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};