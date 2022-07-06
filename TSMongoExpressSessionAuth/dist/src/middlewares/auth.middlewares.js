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
exports.rememberMe = exports.resetPasswordMiddleware = exports.resetPassRequestMiddleWare = exports.SUDOMiddleware = exports.registerMiddleware = exports.loginMiddleware = void 0;
const check_1 = require("express-validator/check");
const User_1 = __importDefault(require("../models/User/User"));
const UserType_1 = __importDefault(require("../models/UserType/UserType"));
const config_1 = __importDefault(require("../models/UserType/config"));
const resettoken_service_1 = require("../services/resettoken.service");
const ResetToken_1 = __importDefault(require("../models/ResetToken/ResetToken"));
function loginMiddleware(req, res, next) {
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    //make sure user exists
    User_1.default.findOne({ username: req.body.username })
        .then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'invalid email or password',
                error: true
            });
        }
    });
}
exports.loginMiddleware = loginMiddleware;
function registerMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, check_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let potentialUser = yield User_1.default.findOne({ username: req.body.username });
        if (potentialUser) {
            return res.status(422).json({
                message: 'user already exists',
                error: true
            });
        }
        next();
    });
}
exports.registerMiddleware = registerMiddleware;
function SUDOMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, check_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        //check if user is admin
        //they should be logged in so we can get the user from the request
        const user = req.user;
        let isAdmin = false;
        if (user) {
            let userRoles = user.userAccess; //user.userAccess is an array of strings of mongoose object ids
            //check if any of these ids(which correspond to the type) match the admin role
            for (let roleId of userRoles) {
                let role = yield UserType_1.default.findById(roleId);
                if (role.accessRights === config_1.default.admin) {
                    isAdmin = true;
                }
            }
        }
        if (!isAdmin) {
            return res.status(403).json({
                message: 'you are not authorized to perform this action'
            });
        }
        next();
    });
}
exports.SUDOMiddleware = SUDOMiddleware;
function resetPassRequestMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, check_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        //check if we got either a username or email and proceed accordingly
        let email = req.body.email;
        let username = req.body.username;
        //check if user exists in either case , handling email first if that is the case
        if (email) {
            let user = yield User_1.default.findOne({ email: email });
            if (!user) {
                return res.status(200).json({
                    message: 'if the user exists, an email will be sent to them',
                });
            }
        }
        else if (username) {
            let user = yield User_1.default.findOne({ username: username });
            if (!user) {
                return res.status(200).json({
                    message: 'if the user exists, an email will be sent to them',
                });
            }
        }
        next();
    });
}
exports.resetPassRequestMiddleWare = resetPassRequestMiddleWare;
function resetPasswordMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, check_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        //get the token from the request
        let resetToken = req.body.resetToken;
        //check if the token is valid or expired
        let verified = (0, resettoken_service_1.verifyJWTToken)(resetToken);
        if (verified.error) {
            return res.status(422).json({
                message: 'invalid or expired token',
                error: true
            });
        }
        //check if the token exists in the database
        let verifiedResetToken = yield ResetToken_1.default.findOne({ resetToken: resetToken });
        if (!verifiedResetToken) {
            return res.status(422).json({
                message: 'invalid token',
                error: true
            });
        }
        //can add any other checks here if needed such as 
        //checking if the user exists in the database
        //checking the ip address of the user who requested the reset
        //checking the region etc, can also check and add previous passwords
        //to the user model if needed and prevent the user from using the same password
        //here would be a good check for that if implementing
        let userID = verifiedResetToken.user;
        req.body.user = userID;
        next();
    });
}
exports.resetPasswordMiddleware = resetPasswordMiddleware;
function rememberMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.remember) {
            console.log('remember me');
            console.log(req.body.remember);
            var oneWeek = 7 * 24 * 60 * 60 * 1000;
            req.session.cookie.expires = new Date(Date.now() + oneWeek);
            req.session.cookie.maxAge = oneWeek;
        }
        next();
    });
}
exports.rememberMe = rememberMe;
//# sourceMappingURL=auth.middlewares.js.map