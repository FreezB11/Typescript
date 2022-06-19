import { NextFunction, Request, Response } from 'express';
const bcrypt = require('bcrypt');
import connect = require("../db/database")
import userSchema,{User,model} from '../db/schema'

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'pong'
    });
};

const StoreDataToDB = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashed = bcrypt.hashSync(password, 10);
    const verified = bcrypt.compareSync(password, hashed)

    if (verified){
        console.log('verified');
    }else{
        console.log('not verified');
    }
    
    const User = model<User>('User', userSchema);

    run().catch(err => console.log(err));

    async function run() {
      // 4. Connect to MongoDB
      const user = new User({
        name: name,
        email: email,
        password:hashed,
      });
    await user.save();
      console.log(user);
    }


    //console.log(name,email,hashed);
    return res.send("posted");
};

export default { serverHealthCheck , StoreDataToDB};