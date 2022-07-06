import express from 'express';
import * as mongoose from 'mongoose';
const passport = require('passport');


const User = require('./models/user');
passport.use(User.createStrategy());
// Alternatively: passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());