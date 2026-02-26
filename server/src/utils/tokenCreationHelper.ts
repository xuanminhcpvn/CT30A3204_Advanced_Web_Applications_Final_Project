import { Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import crypto from "crypto";
import { IUser } from "../models/User";
import { Session } from "../models/Session";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14*24*60*60*1000 //14 days in milliseconds

export const tokenCreation = async (user: IUser, res: Response) =>{
    const jwtPayload: JwtPayload = {
            userId: user._id,
            username: user.username
    }
    const accessToken: string = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: ACCESS_TOKEN_TTL});
        //Create refresh token 
        const refreshToken: string = crypto.randomBytes(64).toString("hex");
        //must implement a session schme to sture refresh token in database 
        await Session.create({
            userId: user._id,
            refreshToken,
            expiredAt: new Date (Date.now() + REFRESH_TOKEN_TTL)
        })
        //refresh token can be stored in cookie
        //cookies settings httpOnly prevent js injection, secure only allow https connection,
        // sameSite relates to CORS  "none" = allow cross-site access to cookie "strict"= only same site as the cookie entry is created
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: REFRESH_TOKEN_TTL
        })
    return accessToken;
}