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
exports.resetUserPass = exports.verifyResetToken = exports.resetPasswordRequest = exports.regularRegister = exports.SUDO_REGISTER = void 0;
const auth_service_1 = require("../services/auth.service");
const convertAcces_1 = __importDefault(require("../utils/convertAcces"));
const resettoken_service_1 = require("../services/resettoken.service");
const email_service_1 = require("../services/email.service");
const User_1 = __importDefault(require("../models/User/User"));
const ResetToken_1 = __importDefault(require("../models/ResetToken/ResetToken"));
function SUDO_REGISTER(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email, accessLevels } = req.body;
        let user;
        if (!accessLevels) {
            user = yield (0, auth_service_1.adminRegistersUser)({ username, password, email });
        }
        else {
            user = yield (0, auth_service_1.adminRegistersUser)({ username, password, email, accessLevels });
        }
        res.status(200).send(user);
    });
}
exports.SUDO_REGISTER = SUDO_REGISTER;
function regularRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        console.log("received request to register user: ", username, password, email);
        let registered = yield (0, auth_service_1.adminRegistersUser)({ username, password, email });
        //login the user
        if (registered.error) {
            res.status(400).send(registered);
        }
        else {
            let returnUser = registered.user;
            // need to login the user as well
            req.login(returnUser, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    let accessConverted = yield (0, convertAcces_1.default)(returnUser.userAccess);
                    console.log("access converted is " + accessConverted);
                    res.status(200).send({
                        message: "User registered successfully",
                        verified: true,
                        user: {
                            username: returnUser.username,
                            email: returnUser.email,
                            accessLevels: accessConverted,
                        }
                    });
                }
            }));
        }
        ;
    });
}
exports.regularRegister = regularRegister;
//request to get reset password link
function resetPasswordRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username } = req.body;
        if (email) {
            //if the user supplied an email  
            let resetToken = yield (0, resettoken_service_1.createResetToken)({ email: email });
            if (resetToken.error) {
                res.status(400).send({ message: "Error creating reset token", });
            }
            else {
                //send the email link here
                (0, email_service_1.sendResetLink)({ email: email, tokenString: resetToken.resetToken });
                res.status(200).send({ message: "if the user exists, an email will be sent to them" });
            }
        }
        else if (username) {
            //if the user supplied a username
            let resetToken = yield (0, resettoken_service_1.createResetToken)({ username: username });
            //find the users email
            let user = yield User_1.default.findOne({ username: username });
            let usersEmail = user.email;
            if (resetToken.error) {
                res.status(400).send(resetToken);
            }
            else {
                //send the email link here
                (0, email_service_1.sendResetLink)({ email: usersEmail, tokenString: resetToken.resetToken });
                res.status(200).send({
                    message: "if the user exists, an email will be sent to them"
                });
            }
        }
    });
}
exports.resetPasswordRequest = resetPasswordRequest;
//used by the UI to display the form or redirect if reset token is invalid
function verifyResetToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { resetToken } = req.params;
        console.log("received request to verify reset token: ", resetToken);
        let verified = (0, resettoken_service_1.verifyJWTToken)(resetToken);
        if (verified.error) {
            return res.status(400).send({
                error: true,
                message: "invalid token or token expired"
            });
        }
        let verifiedResetToken = yield ResetToken_1.default.findOne({ resetToken: resetToken });
        if (verifiedResetToken) {
            return res.status(200).send({
                verified: true,
                message: "token verified",
                user: verifiedResetToken.user
            });
        }
        else {
            return res.status(400).send({
                verified: false,
                message: "invalid token or token expired",
                error: true
            });
        }
    });
}
exports.verifyResetToken = verifyResetToken;
//used to reset the password
//middlewares will check if the token is valid
//if all is valid, the user will be retrieved from the database
//and attached to the request body
function resetUserPass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, user } = req.body;
        console.log("received request to reset password for user: ", user);
        let updated = yield (0, auth_service_1.resetPassword)({ user: user, newPassword: password });
        if (updated.error) {
            return res.status(400).send(updated);
        }
        else {
            return res.status(200).send(updated);
        }
    });
}
exports.resetUserPass = resetUserPass;
//# sourceMappingURL=auth.controller.js.map