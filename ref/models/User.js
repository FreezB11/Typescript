"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var passport_local_mongoose_1 = require("passport-local-mongoose");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: String,
    status: { type: Boolean, required: true },
    is_verified: { type: Boolean, required: true },
    is_temporary: { type: Boolean, required: true }
});
UserSchema.plugin(passport_local_mongoose_1["default"]);
var User = (0, mongoose_1.model)("User", UserSchema);
exports["default"] = User;
