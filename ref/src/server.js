"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require("passport-local");
var body_parser_1 = require("body-parser");
var User_1 = require("../models/User");
var http_1 = require("http");
mongoose.connect('mongodb+srv://yashraj:yashraj0403@cluster0.6vlbp.mongodb.net/?retryWrites=true&w=majority');
var app = (0, express_1["default"])();
var httpServer = http_1["default"].createServer(app);
var NAMESPACE = 'Server';
// app.use((req, res, next) => {
//     /** Log the req */
//     info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
//     res.on('finish', () => {
//         /** Log the res */
//         info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
//     })
//     next();
// });
app.set("view engine", "ejs");
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//passport.use(User.createStrategy());
passport.use(new LocalStrategy(User_1["default"].authenticate()));
passport.serializeUser(User_1["default"].serializeUser());
passport.deserializeUser(User_1["default"].deserializeUser());
app.get("/", function (req, res) {
    res.render("home");
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
    var username = req.body.username;
    var password = req.body.password;
    User_1["default"].register(new User_1["default"]({ username: username }), password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
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
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/login");
}
var port = process.env.PORT || 3000;
var getTimeStamp = function () {
    return new Date().toISOString();
};
httpServer.listen(port, function () {
    console.log("started on ".concat(port));
});
