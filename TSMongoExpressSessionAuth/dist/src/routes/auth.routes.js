"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const connect_ensure_login_1 = __importDefault(require("connect-ensure-login"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const validators_1 = require("../middlewares/validators/validators");
const router = express_1.default.Router();
// @route   POST /sudoregister
// @desc    Sudo register
// @access  Private
// admin only access for creating new users where that user can be an admin or any other regular user
// difference is that sudo register accepts user access levels as params {admin, user, banned, moderator}
// flow goes like this:
// 1. user sends a request to /sudoregister
// 2. server checks if the user is logged in
// 3. if user is logged in, server checks if the user is an admin
// 4. if user is an admin, server checks if params are valid
// 5. if params are valid, server creates a new user with the given params
router.post("/sudoregister", connect_ensure_login_1.default.ensureLoggedIn("/loginerror"), validators_1.registrationValidation, validators_1.SUDOOptionalUserAccessLevel, auth_middlewares_1.SUDOMiddleware, auth_controller_1.SUDO_REGISTER);
router.post("/login", auth_middlewares_1.rememberMe, passport_1.default.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/error",
    failureFlash: true
}));
router.post("/register", validators_1.registrationValidation, auth_middlewares_1.registerMiddleware, auth_controller_1.regularRegister);
router.get("/logout", function (req, res) {
    console.log("logging out");
    req.logout();
    res.redirect("/logoutsuccess");
});
router.get("/logoutsuccess", function (req, res) {
    res.status(200).send({
        message: "You have been logged out"
    });
});
router.post("/resetPasswordRequest", validators_1.resetPassRequestValidation, auth_middlewares_1.resetPassRequestMiddleWare, auth_controller_1.resetPasswordRequest);
//this is what our frontend client will use
//to call the server and get the user to change their password
router.get("/verifyResetToken/:resetToken", auth_controller_1.verifyResetToken);
router.post("/resetPassword", validators_1.resetPasswordValidation, auth_middlewares_1.resetPasswordMiddleware, auth_controller_1.resetUserPass);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map