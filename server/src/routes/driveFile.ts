//core CRUD APIs:
import {Router} from "express";
//What this route does:
//Registeration //validation //Salting + hashing
//Login 
//Feature specific to user
//All actions that need authorization use validateToken function

const router: Router = Router();
/*
router.get("files");//receive all files
router.post("files");//create a document
router.get("files/:id")//get full document for owner/collaborator (used by editor page )
router.patch("files/:id")//update document content? or title
router.delete("doucments/:id")//delete document
//Optional features: clone, download
router.post("files/:id/clone")//to clone document
router.get("files/:id/download")//to download document as PDF

//handles edit-lock
router.post("files/:id/lock");//user request to start editing
router.post("files/:id/unlock");//when user stops editing or closes editor
router.get("files/:id/lock");//check current locks status Response: { isLocked, lockedByUserId?, lockedAt?, canCurrentUserTakeOver? } 
*/
export default router;