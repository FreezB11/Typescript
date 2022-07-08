"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("./config");
var UserTypeSchema = new mongoose_1.Schema({
    accessRights: {
        type: String,
        required: true,
        "default": config_1["default"].user
    }
});
var UserType = (0, mongoose_1.model)('UserType', UserTypeSchema);
exports["default"] = UserType;
