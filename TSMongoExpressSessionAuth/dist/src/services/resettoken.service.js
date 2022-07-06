"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTToken = exports.createResetToken = exports.generateJWTToken = void 0;
const User_1 = __importDefault(require("../models/User/User"));
const ResetToken_1 = __importDefault(require("../models/ResetToken/ResetToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWTToken = (user) => {
    let payload = {
        user: {
            id: user._id,
        }
    };
    let token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
    return token;
};
exports.generateJWTToken = generateJWTToken;
//this will be used to create a new reset token for our user
//middle ware will handle the user validation
const createResetToken = ({ email, username }) => __awaiter(void 0, void 0, void 0, function* () {
    //check if the user exists by email or username
    let user;
    if (email) {
        console.log("recieved email");
        user = yield User_1.default.findOne({ email: email });
    }
    else if (username) {
        console.log("recieved username");
        user = yield User_1.default.findOne({ username: username });
    }
    if (!user) {
        return {
            error: true
        };
    }
    //check if an existing reset token exists for the user
    let resetToken = yield ResetToken_1.default.findOne({ user: user._id });
    if (resetToken) {
        //if the token exists we will delete it and create a new one
        yield resetToken.remove();
    }
    //create a new reset token
    let newResetToken = new ResetToken_1.default({
        user: user._id,
        resetToken: (0, exports.generateJWTToken)(user),
        createdAt: new Date()
    });
    //save the new reset token
    console.log("saving new reset token");
    console.log(newResetToken);
    yield newResetToken.save();
    return {
        resetToken: newResetToken.resetToken,
    };
});
exports.createResetToken = createResetToken;
const verifyJWTToken = (token) => {
    console.log("decoding token");
    try {
        let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("decoded token");
        console.log(decoded);
        return {
            error: false,
            decoded: decoded
        };
    }
    catch (err) {
        console.log("error decoding token");
        console.log(err);
        return {
            error: true,
            message: err.message
        };
    }
};
exports.verifyJWTToken = verifyJWTToken;
//# sourceMappingURL=resettoken.service.js.map