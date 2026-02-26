/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 26/02/2026
*/
import mongoose, {Document, Schema, Types} from "mongoose";
//custom type

interface IDriveFolder extends Document {
  name: string;
  ownerId: Types.ObjectId;
  parentFolderId?: Types.ObjectId | null;
  permissions: { userId: Types.ObjectId; role: "viewer" | "editor" }[];
  visibility: "private" | "public" | "link";
  shareLink?: string | null;
  isFavorite: boolean;
  isSoftDeleted: boolean;
  softDeletedAt?: Date | null;
}

const driveFolderSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    parentFolderId: {
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
const DriveFolder:mongoose.Model<IDriveFolder> = mongoose.model<IDriveFolder>("Folder", driveFolderSchema);


export {IDriveFolder,DriveFolder};