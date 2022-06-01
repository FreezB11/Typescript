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
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
});

const User = model<User>('User', userSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
  });
//   await user.save();
  console.log(user);
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

// router.set('views', path.join(__dirname, './views'));
// router.set('view engine', 'ejs');
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





export = router;