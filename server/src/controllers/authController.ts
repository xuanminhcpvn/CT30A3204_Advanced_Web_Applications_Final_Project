import bcrypt from 'bcrypt';
import { User, IUser} from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        const {username, password, email, displayName} = req.body;
        //All fields filled?
        if (!username || password || !email || !displayName){
            return res.status(400).json({message: "Must fill all fields"});
        }
        //Does the user exists? (email is unique) but actually username unique too?
    } catch(err:any) {
        console.error(`Error while fetching file: ${err}`);
        return res.status(500).json({message: "Internal server error"});
    }
    
} 

