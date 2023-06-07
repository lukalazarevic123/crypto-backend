"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonceModel = exports.NonceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NonceSchema = new mongoose_1.Schema({
    userAddress: String,
    nonce: String
}, {
    collection: "nonces"
});
exports.NonceModel = (0, mongoose_1.model)("nonces", exports.NonceSchema);
