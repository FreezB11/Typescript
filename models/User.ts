import mongoose, {
  PassportLocalDocument,
  PassportLocalSchema,
  PassportLocalModel,
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export enum UserStatus {
  Created = 'created',
  Approved = 'approved',
  Banned = 'banned',
}

export enum UserRole {
  Member = 'member',
  Admin = 'admin',
  Public = 'public',
}

// An interface for props to create a new user
interface UserAttrs {
  email: string;
  password: string;
  status?: UserStatus;
  role?: UserRole;
}

// An interface that describes the properties of User document
interface UserDoc extends PassportLocalDocument {
  email: string;
  password: string;
  status: UserStatus;
  role: UserRole;
}

// An interface that describes User model
export interface UserModel extends PassportLocalModel<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
) as PassportLocalSchema;

userSchema.set('versionKey', 'version');
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };