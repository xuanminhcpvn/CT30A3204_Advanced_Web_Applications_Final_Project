import {Request, Response, Router} from "express";
//What this route does:
//Registeration //validation //Salting + hashing
//Login 
//Feature specific to user
//All actions that need authorization use validateToken function

const router: Router = Router();

export default router;