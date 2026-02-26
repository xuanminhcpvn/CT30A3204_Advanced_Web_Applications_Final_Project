/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 26/02/2026
*/
import mongoose, {Document, Schema, Types} from "mongoose";
//custom type

interface IDriveFile extends Document {
    name: string,
    type: "text" | "spreadsheet" | "slide" | "image",
    contents: string,
    ownerId: Types.ObjectId,
    folderId?: Types.ObjectId | null,
    permissions: [{userId:Types.ObjectId, role: "viewer" | "editor" | "owner" }],
    visibility: "private" | "public" | "link",
    shareLink?: string,
    isFavorite: boolean,
    isSoftDeleted: boolean,
    softDeletedAt?: Date
}
//Design note: contents can be string since ImageUrl is string. Editor, spreadsheet and slides are JSON and can be stringified
//{timestamp = true} will create createdAt and updatedAt attributs
const driveFileSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,       
      enum: ["text", "spreadsheet", "slide", "image"],
      required: true,
    },
    contents: {
      type: String,
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    permissions: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        role: {
          type: String,
          enum: ["viewer", "editor"],
          required: true,
        },
      },
    ],
    visibility: {
      type: String,
      enum: ["private", "public", "link"],
      default: "private",
      required: true,
    },
    shareLink: {
      type: String,
      default: null,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isSoftDeleted: {
      type: Boolean,
      default: false,
    },
    softDeletedAt: {
      type: Date,
      default: null,
    },
},{
    timestamps: true
}
);
const DriveFile:mongoose.Model<IDriveFile> = mongoose.model<IDriveFile>("File", driveFileSchema);


export {IDriveFile,DriveFile};