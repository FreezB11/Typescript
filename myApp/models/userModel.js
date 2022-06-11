// const mongoose = require("../database");
var mongoose = require('mongoose');
 
const Schema = mongoose;
// create an schema
var userSchema = mongoose.Schema({
            name: String,
            password: String,
            email:String
        });
 
var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Users", userModel);