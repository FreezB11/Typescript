import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalSchema } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    displayname: String,
  });
  
  userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
  });
  
  const User = mongoose.model('User', userSchema as PassportLocalSchema);
  
  export default User;