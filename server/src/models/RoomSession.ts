/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 26/02/2026
*/
import mongoose, {Document, Schema} from "mongoose";
interface IRoomSession extends Document {
    driveFileId: string,
    editoruserId: string,
    users: [
        {
            userId:string,
            joinedAt:Date,
            lastPingAt?:Date
        }
    ],
    status: "active" | "expired"
}

const roomSessionSchema: Schema = new Schema({

})
const RoomSession:mongoose.Model<IRoomSession> = mongoose.model<IRoomSession>("User",roomSessionSchema);


export {IRoomSession,RoomSession};