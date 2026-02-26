import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";
//import {validateToken} from "../middleware/validateToken"
//import fileRoute from "./driveFile";
//import folderRoute from "./driveFolder";
//import sharedRoute from "./shared";

const router = Router();

// Public Route (no auth needed)
router.use("/auth", authRoute);
//router.use("/shared", sharedRoute);
// Protected Route (you will add auth middleware inside those route files or here)
//router.use(validateToken);
router.use("/users", userRoute);
//router.use("/files", fileRoute);
//router.use("/folders", folderRoute);
export default router;
