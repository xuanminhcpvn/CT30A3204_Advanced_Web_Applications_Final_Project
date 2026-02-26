/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 26/02/2026
*/
import mongoose, {Document, Schema} from "mongoose";
//custom type
interface IUser extends Document {
    username: string,
    email: string,
    password?: string,
    googleId?:string,
    displayName:string,
    profilePicture?:string,
    settings: {
        theme: "light" | "dark",
        language: "en" | "fi"
    }
    
}
//{timestamp = true} will create createdAt and updatedAt attributs
const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        required: false
    },
    settings: {
        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light",
            required: true,
        },
        language: {
            type: String, 
            enum: ["en", "fi"],
            default: "en",
            required: true,
        }
    }
},{
    timestamps: true
}
);

const User:mongoose.Model<IUser> = mongoose.model<IUser>("User",userSchema);


export {IUser,User};