/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 26/02/2026
*/
import mongoose, {Document, Schema, Types} from "mongoose";

interface ISession extends Document {
    userId: Types.ObjectId,
    refreshToken: string,
    expiredAt: Date
}

const sessionSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    expiredAt: {
        type: Date,
        required:true
    },
},
{
    timestamps: true,
});

//index to automatically remove refreshToken entry when it expired
sessionSchema.index({expiredAt: 1}, {expireAfterSeconds: 0});

const Session:mongoose.Model<ISession> = mongoose.model<ISession>("Session",sessionSchema);

export {ISession,Session};