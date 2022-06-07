import { Schema, model} from 'mongoose';

interface User {
    name: string;
    email: string;
    avatar?: string;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
});

export default {userSchema}

