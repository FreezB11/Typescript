import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import path from "path";
import * as http from 'http';
import logging from './config/logging';
import HomeRoutes from './routes/homerouter';
import connect = require("./database/database")
import userSchema,{User,model} from './database/schema'
import { Server } from "socket.io";
import socketIO from "socket.io-client";
import cors from "cors";

connect;

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
const httpServer = http.createServer(router);

router.use(cors);

const io = new Server(httpServer,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
  },
});

io.on("connection",()=>{
  console.log("useer connected");
})

//const ws = "http://localhost:6900/"

const socket = socketIO();

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

export = router; httpServer;