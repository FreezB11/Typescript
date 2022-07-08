import { Document, model, Schema, PassportLocalModel, PassportLocalDocument, PassportLocalSchema} from "mongoose";

// import { IUserType } from "./UserType";

import passportLocalMongoose from "passport-local-mongoose";

export interface UserData {
      is_temporary: boolean;
      is_verified: boolean;
      status: boolean;
      username: string;
      email: string;
  }

const UserSchema = new Schema({
      username: { type: String, required: true },
      email:{type: String, required: true },
      password: String,
      status: { type: Boolean, required: true },
      is_verified: { type: Boolean, required: true },
      is_temporary: { type: Boolean, required: true }
    });

interface UserModel <T extends Document> extends PassportLocalModel<T> {}

UserSchema.plugin(passportLocalMongoose);

const User = model("User", UserSchema);
export default User;