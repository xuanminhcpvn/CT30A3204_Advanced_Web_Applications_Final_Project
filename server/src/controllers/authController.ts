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
        const existingUser: IUser | null = await User.findOne(username);
        if (existingUser) {
            return res.status(403).json({username: "username already in use"});
        } 
        //hashing password
        const salt: string = bcrypt.genSaltSync(10);
        const hashedPassword: string = bcrypt.hashSync(password, salt);
        //create new user
        await User.create({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
            displayName: displayName
        })
        return res.status(200).json({message: "User registered sucessfully"});
    } catch(err:any) {
        console.error(`Error while fetching file: ${err}`);
        return res.status(500).json({message: "Internal server error"});
    }
} 


