var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/userModel")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
secret: "node js mongodb",
resave: false,
saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.get("/", function (req, res) {
  res.render('register', {
  title: 'Registration Page',
  name: '',
  email: '',
  password: ''    
  })
  });
  // Showing secret page
  app.get("/home", isLoggedIn, function (req, res) {
  res.render("home");
  });
  // Showing register form
  app.get("/register", function (req, res) {
  res.render('register', {
  title: 'Registration Page',
  name: '',
  email: '',
  password: ''    
  })
  });
  // Handling user signup
  app.post("/register", function (req, res) {
  var email = req.body.email
  var password = req.body.password
  User.register(new User({ email: email }),
  password, function (err, user) {
  if (err) {
  console.log(err);
  return res.render("register");
  }
  passport.authenticate("local")(
  req, res, function () {
  req.flash('success', 'You have logged in')
  res.render("home");
  });
  });
  });
  //Showing login form
  app.get("/login", function (req, res) {
  res.render('login', {
  title: 'Login',
  email: '',
  password: ''     
  })
  });
  //Handling user login
  app.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login"
  }), function (req, res) {
  });
  //Handling user logout
  app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
  });
  function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
  }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log("Server Has Started!");
  });