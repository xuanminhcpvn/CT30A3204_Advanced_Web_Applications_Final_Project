/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 26/02/2026
*/
import mongoose, {Document, Schema, Types} from "mongoose";
interface IEditSession extends Document {
    driveFileId: Types.ObjectId,
    editorUserId: Types.ObjectId,
    users: [
        {
            userId: Types.ObjectId,
            joinedAt: Date,
            lastPingAt?: Date
        }
    ],
    status: "active" | "expired"
}

const editSessionSchema: Schema = new Schema({
    driveFileId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    editorUserId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            joinedAt: {
                type: Date,
                required: true
            },
            lastPingAt: {
                type: Date
            }
        }
    ]
})
const EditSession:mongoose.Model<IEditSession> = mongoose.model<IEditSession>("User",editSessionSchema);

export {IEditSession,EditSession};