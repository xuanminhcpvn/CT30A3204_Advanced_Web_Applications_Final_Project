//import {Request, Response, Router} from "express";
import { Router} from "express";
const router: Router = Router();


//soft delete
// router.post("trash/:fileId");//check current user owns file set isDeleted = true, deletedAt = new Date(), POST for state change 
// router.get("trash");//find all docs with ownerId = curentUser.id and is deleted= true, support pagination
// router.post("trash/:fileId/restore")//restore from trash Set isDeleted = false, deletedAt = null (or remove field).
// router.delete("trash/:fileId")// Actually remove the doc from MongoDB (deleteOne). Optional: only allow if isDeleted === true (prevent accidental full delete from normal list).
export default router;