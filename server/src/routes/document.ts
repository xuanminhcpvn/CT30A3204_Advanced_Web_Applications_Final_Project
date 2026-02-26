//core CRUD APIs:
import {Router} from "express";
//What this route does:
//Registeration //validation //Salting + hashing
//Login 
//Feature specific to user
//All actions that need authorization use validateToken function

const router: Router = Router();

router.get("documents");//receive all documents
router.post("documents");//create a document
router.get("documents/:id")//get full document for owner/collaborator (used by editor page )
router.patch("documents/:id")//update document content? or title
router.delete("doucments/:id")//delete document
//Optional features: clone, download
router.post("documents/:id/clone")//to clone document
router.get("documents/:id/download")//to download document as PDF

//handles edit-lock
router.post("documents/:id/lock");//user request to start editing
router.post("documents/:id/unlock");//when user stops editing or closes editor
router.get("documents/:id/lock");//check current locks status Response: { isLocked, lockedByUserId?, lockedAt?, canCurrentUserTakeOver? } 
export default router;