"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResetTokenSchema = new mongoose_1.Schema({
    resetToken: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
const ResetToken = (0, mongoose_1.model)('ResetToken', ResetTokenSchema);
exports.default = ResetToken;
//# sourceMappingURL=ResetToken.js.map