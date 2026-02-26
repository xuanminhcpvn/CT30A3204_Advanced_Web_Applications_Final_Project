import jwt, {JwtPayload} from "jsonwebtoken";
import {IUser, User} from "../models/User";
import { Request, Response, NextFunction } from "express";
//This interface purpose is to add User info into the request
//Important so that it can be kept in request even if requesting other services
export interface CustomRequest extends Request {
    user?: IUser;
}
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //token must be splited since the token have the pair mark? 
        //Since header key-value content is like => authorization:Bearer token_value
        //Extracting accessToken
        const accessToken: string | undefined = req.header(`authorization`)?.split(" ")[1];//[0]=Bearer [1]=token_value //req.header vs req.headers explanation here: https://stackoverflow.com/questions/60855411/req-header-vs-req-headers-in-express
        if (!accessToken){
            return res.status(401).json({message: "Access denied, missing access token"});
        }
        
        //decode the token and verify the token's validity
        //This one here might be a bit confusing why there is no comparison done to make sure that verified match with req.user 
        //but jwt.verify will throw error if the token in the request does not match with decoded value
        const decodedUser = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload & { userId: string };
        const user: IUser | null = await User.findById(decodedUser.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        //search for userId
        req.user = user;
        
        //return user's info to req so that other function can use it
        next();//basically interact with the routing function in user that if verification is ok, user can proceed further
        return;
    } catch (err:any) {
        console.error("Error while validating access token",err);
        res.status(400).json({message: "Access denied, missing accessToken"})
    }
}