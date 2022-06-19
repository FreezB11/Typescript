const mongoose = require("../database");
 

var Schema = mongoose.Schema;
// create an schema
var userSchema = new Schema({
            name: String,
            password: String,
            email:String
        });
 
var users = mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Users", users);