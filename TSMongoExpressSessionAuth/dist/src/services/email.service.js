"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetLink = void 0;
require('dotenv').config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const defaults_1 = __importDefault(require("../../config/defaults"));
const clientURL = defaults_1.default.adminClient;
const mailPORT = Number(process.env.MAIL_PORT);
const host = process.env.MAIL_HOST;
//if using Google email service, you may need to allow less secure apps
const transporter = nodemailer_1.default.createTransport({
    host: host,
    port: mailPORT,
    secure: true,
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
});
const sendResetLink = ({ tokenString, email }) => {
    let link = `${clientURL}/reset/${tokenString}`;
    let html = `<p>You have requested to reset your password. Please click the link below to reset your password:</p>
                  <a href="${link}">${link}</a>`;
    const mailOptions = {
        from: process.env.MAIL_EMAIL,
        to: email,
        subject: "Password Reset",
        html: html
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return {
                error: true,
            };
        }
        else {
            console.log('Message sent: %s', info.messageId);
            return {
                error: false,
            };
        }
    });
};
exports.sendResetLink = sendResetLink;
//# sourceMappingURL=email.service.js.map