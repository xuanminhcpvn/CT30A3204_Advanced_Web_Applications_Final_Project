
import {Router} from "express";
import {register, login, logout, googleLogin} from "../controllers/authController";
//import {register, login, logout} from "../controllers/authController";
import passport from '../middleware/google-passport-config';
const router: Router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/login/google",passport.authenticate("google", {scope: ["profile", "email"]}))
router.get("/google/callback", passport.authenticate("google", {session: false,failureRedirect: "/user/login"}),googleLogin);
export default router; 