import bodyParser from 'body-parser';
import express from 'express';
import path from "path";
import logging from './config/logging';
import HomeRoutes from './routes/homerouter';
import connect = require("./database/database")
import { Schema, model} from 'mongoose';

connect;

interface User {
    name: string;
    email: string;
    avatar?: string;
    address:{
        street: string,
        city:string,
    }
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    address:String
});

const User = model<User>('User', userSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
    address:{
        street:"main street",
        city:"banglore"
    },
  });
//   await user.save();
  console.log(user);
//   console.log(user.email); // 'bill@initech.com'
}

const NAMESPACE = 'Server';

const router = express();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});


router.set('views', path.join(__dirname, './views'));
router.set('view engine', 'ejs');
router.use(express.static(path.join(__dirname, "public")));
/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/', HomeRoutes);

router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).render("404")

    // res.status(404).json({
    //     message: error.message
    // });
});



export = router;