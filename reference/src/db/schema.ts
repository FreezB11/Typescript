import { Schema, model} from 'mongoose';
import passportmongoose from 'passport-local-mongoose'

interface User {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type: String, required: true}
});

userSchema.plugin(passportmongoose)

export default userSchema;
export{User, model}

