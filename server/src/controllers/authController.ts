import bcrypt from 'bcrypt';
import { User, IUser} from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        //validation
        const {username, password, email, displayName} = req.body;
        //All fields filled?
        if (!username || !password || !email || !displayName){
            return res.status(400).json({message: "Must fill all fields"});
        }
        //Does the user exists? (email is unique) but actually username unique too?
        const existingUser: IUser | null = await User.findOne({$or: [{ username }, { email }]}
);
        if (existingUser) {
            return res.status(409).json({username: "username or email already in use"});
        } 
        //hashing password
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string =  await bcrypt.hash(password, salt);
        //create new user
        await User.create({
            username,
            email,
            password: hashedPassword,
            displayName
        })
        return res.status(200).json({message: "User registered sucessfully"});
    } catch(err:any) {
        console.error(`Error while registering user: ${err}`);
        return res.status(500).json({message: "Internal server error"});
    }
} 


