import passport from "passport";
import { Strategy, Profile } from "passport-google-oauth20";
//Source: https://www.passportjs.org/packages/passport-google-oauth2/
passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
    (accessToken: string, refreshToken: string, profile: Profile, done) => {
    console.log("Access Token:", accessToken),
    console.log("Refresh Token:", refreshToken),
    console.log("Profile:", profile)
    return done(null,profile) //either return null==error or profile==user
}))

export default passport;