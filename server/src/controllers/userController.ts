import { Request, Response} from "express"

export const authMe = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({user: req.user})
    } catch (err:any) {
        console.error("Error while calling authMe",err)
        return res.status(500).json({message:"Internal server error"});
    }
    
}