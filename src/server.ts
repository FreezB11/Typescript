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


passport.use(User.createStrategy());
// Alternatively: passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());