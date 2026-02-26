import {Router} from "express";
import {authMe} from "../controllers/userController";
import { validateToken } from "../middleware/validateToken";
const router: Router = Router();

router.get("/me",validateToken, authMe);// Returns: { id, email, name, profilePicture?, createdAt, ... }
// router.patch("users/me")//Update current user profile (name, maybe language theme). Body: { name?, language?, theme? }
// router.get("documents/:id/share")//Get current share status(for what?)
// router.post("users/me/profileImage")//upload profile picture
export default router;