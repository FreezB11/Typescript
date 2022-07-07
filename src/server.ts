import express, { Express, Request, Response } from 'express';
import * as mongoose from 'mongoose';
const passport = require('passport');
const LocalStrategy = require("passport-local")
import bodyParser from 'body-parser';
import User from '../models/User';
import * as passportLocalMongoose from 'passport-local-mongoose';
import http from 'http';


mongoose.connect('mongodb+srv://yashraj:yashraj0403@cluster0.6vlbp.mongodb.net/?retryWrites=true&w=majority');


const app = express();

const httpServer = http.createServer(app);

const NAMESPACE = 'Server';


app.use((req, res, next) => {
    /** Log the req */
    info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    next();
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000;

var info = (namespace, message, object) => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};

var warn = (namespace, message, object) => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};

var error = (namespace, message, object) => {
    if (object) {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

var debug = (namespace, message, object) => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

var getTimeStamp = () => {
    return new Date().toISOString();
};

httpServer.listen(port, () => info(NAMESPACE, `Server is running localhost:6900`));
