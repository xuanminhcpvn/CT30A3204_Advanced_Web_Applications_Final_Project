import bcrypt from 'bcrypt';
import { User, IUser} from "../models/User";
import { Request, Response } from "express";
//import jwt, {JwtPayload} from "jsonwebtoken";
import {Session} from "../models/Session";
import { tokenCreation } from "../utils/tokenCreationHelper";
//import crypto from "crypto";
import dotenv from "dotenv";
import { Profile } from 'passport';

//const ACCESS_TOKEN_TTL = "30m";
//const REFRESH_TOKEN_TTL = 14*24*60*60*1000 //14 days in milliseconds
dotenv.config();
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
export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        if (!username || !password){
            return res.status(400).json({message: "username or password not found"})
        }
        //Check that user exists
        const user: IUser | null = await User.findOne({ username });
        if (!user){
            return res.status(401).json({message: "username or password is incorrect"});
        }
        //compare hashedpassword in database and compare with password input
        const correctPassword = await bcrypt.compare(password, user.password as string);

        if (!correctPassword) {
            return res.status(401).json({message: "Login failed"});
        }
        const accessToken = await tokenCreation(user, res);
        //return access token in response.body
        return res.status(200).json({message: `User ${user.displayName} is logged in!`, accessToken})
    } catch (err:any) {
        console.error(`Error while login: ${err}`);
        return res.status(500).json({message: "Internal server error"});
    }
}

//Note: req.user exists here since passport middleware create that automatically when we inserted profile field in our Google strategy in google-passport-config.ts
export const googleLogin =  async (req: Request, res: Response) => {
    try {
        const profile = req.user as Profile | undefined;    
        if (!profile) {
            return res.status(400).json({ error: "Google profile does not exist" });
        }
        const googleId = profile.id as string;
        const username = profile.displayName as string;
        const displayName = profile.displayName as string;
        const email = profile.emails?.[0]?.value?.toLowerCase() as string;
        const profilePicture = profile.photos?.[0]?.value as string;
        //check whether user already exist first by googleId
        let user: IUser | null = await User.findOne({googleId})
        //then check user existence with username or email. They might exist but was not connected with google
        if (!user) {
            user = await User.findOne({$or: [{ username }, { email }]});
            return res.status(401).json({ message: 'User not found or not authenticated' });
        }
        if (user) {
            user.googleId = googleId;
            if (!user.profilePicture){
                user.profilePicture = profilePicture as string;
                await user.save();
            }
        } else {
            await User.create({
                username,
                email,
                googleId,
                displayName,
                profilePicture,
                settings: {
                    theme: "light",
                    language: "en"
                    }
                });
            }
        //create new user if not exist
        console.log(req.user);
        const accessToken = await tokenCreation(user, res);
        //return access token in response.body
        return res.status(200).json({message: `User ${user.displayName} is logged in!`, accessToken})
    } catch (err:any) {
       console.error(`Error while login with GoogleOAuth: ${err}`);
       return res.status(500).json({message: "Internal server error"}); 
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        // extract refreshtoken from cookie
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken){
            // remove refreshtoken from session
            await Session.deleteOne({refreshToken: refreshToken});
            // remove refreshtoken in cookie
            res.clearCookie("refreshToken");
        }
        return res.sendStatus(200).json({message:`Logged out`})
    } catch (err:any) {
        console.error(`Error while logout: ${err}`);
        return res.status(500).json({message: "Internal server error"});
    }
}

// export const login = async (req: Request, res: Response) => {
//     try {
//         const {username, password} = req.body;
//         if (!username || !password){
//             return res.status(400).json({message: "username or password not found"})
//         }
//         //Check that user exists
//         const user: IUser | null = await User.findOne({ username });
//         if (!user){
//             return res.status(401).json({message: "username or password is incorrect"});
//         }
//         //compare hashedpassword in database and compare with password input
//         const correctPassword = await bcrypt.compare(password, user.password as string);

//         if (!correctPassword) {
//             return res.status(401).json({message: "Login failed"});
//         }
//         //Do passwords match 
//         const jwtPayload: JwtPayload = {
//             userId: user._id,
//             username: user.username
//         }
//         const accessToken: string = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: ACCESS_TOKEN_TTL});
//         //Create refresh token 
//         const refreshToken: string = crypto.randomBytes(64).toString('hex');
//         //must implement a session schme to sture refresh token in database 
//         await Session.create({
//             userId: user._id,
//             refreshToken,
//             expiredAt: new Date (Date.now() + REFRESH_TOKEN_TTL)
//         })
//         //refresh token can be stored in cookie
//         //cookies settings httpOnly prevent js injection, secure only allow https connection,
//         // sameSite relates to CORS  "none" = allow cross-site access to cookie "strict"= only same site as the cookie entry is created
//         res.cookie("refreshToken", refreshToken, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "lax",
//             maxAge: REFRESH_TOKEN_TTL
//         })
//         //return access token in response.body
//         return res.status(200).json({message: `User ${user.displayName} is logged in!`, accessToken})
//     } catch (err:any) {
//         console.error(`Error while login: ${err}`);
//         return res.status(500).json({message: "Internal server error"});
//     }
// }