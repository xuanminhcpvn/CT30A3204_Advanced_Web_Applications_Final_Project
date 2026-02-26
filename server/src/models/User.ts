/* CT30A3204 Advanced Web Applications
    Done by: Minh Pham
    Created at: 18/02/2026
*/
import mongoose, {Document, Schema} from "mongoose";
//custom type
interface IUser extends Document {
    username: string,
    password: string
}

