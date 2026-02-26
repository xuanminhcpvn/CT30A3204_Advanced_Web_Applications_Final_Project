import {Router} from "express";

const router: Router = Router();

router.get("users/me");// Returns: { id, email, name, avatarUrl?, createdAt, ... }
router.patch("users/me")//Update current user profile (name, maybe language theme). Body: { name?, language?, theme? }
router.get("documents/:id/share")//Get current share status(for what?)
router.post("users/me/profileImage")//upload profile picture
export default router;