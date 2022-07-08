import express, { Express, Request, Response} from 'express';
import mongoose from "mongoose";
const passport = require('passport');
const LocalStrategy = require("passport-local")
import bodyParser from 'body-parser';
import User from '../models/User';
import * as passportLocalMongoose from 'passport-local-mongoose';
import http from 'http';
import path from 'path';
import logging from './config/logging';

mongoose.connect('mongodb+srv://yashraj:yashraj0403@cluster0.6vlbp.mongodb.net/?retryWrites=true&w=majority');


const app = express();

const httpServer = http.createServer(app);

const NAMESPACE = 'Server';


app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    next();
});

app.set("views", path.join(__dirname, "./views"));

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



app.get("/", function (req, res: Response) {
	res.render("home.ejs");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
	res.render("secret");
});

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
	var username = req.body.username
	var password = req.body.password
	User.register(new User({ username: username }),
			password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(
			req, res, function () {
			res.render("secret");
		});
	});
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res, next) {
	req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});



function isLoggedIn(req : Request, res: Response, next:Function) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}


var port = process.env.PORT || 3000;


var getTimeStamp = () => {
    return new Date().toISOString();
};

httpServer.listen(port, () => {
    console.log(`started on ${port}`)
});
