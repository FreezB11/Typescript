import { Document, model, Schema, PassportLocalModel, PassportLocalDocument, PassportLocalSchema} from "mongoose";

import { IUserType } from "./UserType";

import passportLocalMongoose from "passport-local-mongoose";

export interface IUser extends PassportLocalDocument {
      userAccess: IUserType["_id"];
      email: string;
      username: string;
      avatar: string;
      
}

const UserSchema = new Schema({
      email: {
            type: String,
            required: true,
            unique: true,
            
      },
      username: {
            type: String,
            required: true,
            unique: true,
      },
      userAccess: [
            {
                  type: Schema.Types.ObjectId,
                  ref: "UserType",
                  required: true,
            },
            ],
      avatar: {
            type: String,
      },
}) as PassportLocalSchema ;

interface UserModel <T extends Document> extends PassportLocalModel<T> {}

UserSchema.plugin(passportLocalMongoose);

const User = model<IUser>("User", UserSchema);
export default User;