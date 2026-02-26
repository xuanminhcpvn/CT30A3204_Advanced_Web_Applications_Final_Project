//core CRUD APIs:
import { Router} from "express";
//What this route does:
//Registeration //validation //Salting + hashing
//Login 
//Feature specific to user
//All actions that need authorization use validateToken function

const router: Router = Router();

router.get("folders");//List folders
router.post("folders");//create a folder Body: { name?, parentFolderId? }
router.get("folders/:id");//get single folder info
router.patch("folders/:id");//Rename folder or move it under another folder Body: { name?, parentFolderId? }
router.delete("folders/:id");//delete folder //Cascade
router.get("folders/:id/download");//to download folder as zip? will not probably implement
export default router;