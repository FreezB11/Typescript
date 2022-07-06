"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.resetPassRequestValidation = exports.SUDOOptionalUserAccessLevel = exports.loginValidation = exports.registrationValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registrationValidation = [
    (0, express_validator_1.check)("username", "username is required").not().isEmpty().isLength({ min: 3 }).withMessage("username must be at least 3 characters long"),
    (0, express_validator_1.check)("email", "email is required").not().isEmpty().isEmail().withMessage("email is invalid"),
    (0, express_validator_1.check)("password", "password is required").not().isEmpty().isLength({ min: 6 }).withMessage("password must be at least 6 characters long"),
    (0, express_validator_1.check)("confirmPassword", "password confirmation is required").not().isEmpty().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    })
];
exports.loginValidation = [
    (0, express_validator_1.check)("username", "username is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "password is required").not().isEmpty(),
];
exports.SUDOOptionalUserAccessLevel = [
    (0, express_validator_1.check)("accessLevels", "accessLevels must be an array containing either admin, user, moderator, or banned").optional().isArray().custom((value, { req }) => {
        if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== "admin" && value[i] !== "user" && value[i] !== "moderator" && value[i] !== "banned") {
                    throw new Error("accessLevels must be an array containing either admin, user, moderator, or banned");
                }
            }
        }
        return true;
    }),
];
exports.resetPassRequestValidation = [
    //check for email or username
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.check)("email", "email is required").not().isEmpty().isEmail().withMessage("email is invalid"),
        (0, express_validator_1.check)("username", "username is required").not().isEmpty().withMessage("username is invalid")
    ]),
];
exports.resetPasswordValidation = [
    (0, express_validator_1.check)("resetToken", "resetToken is required").not().isEmpty(),
    (0, express_validator_1.check)("password", "password is required").not()
        .isEmpty().isLength({ min: 6 }).
        withMessage("password must be at least 6 characters long"),
    (0, express_validator_1.check)("confirmPassword", "password confirmation is required").not().isEmpty().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    })
];
//# sourceMappingURL=validators.js.map