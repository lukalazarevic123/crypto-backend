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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbController = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const NonceModel_1 = require("../model/NonceModel");
class DbController {
    constructor() {
        this.route = "/db";
        this.router = (0, express_1.Router)();
        this.router.post('/init', (request, response) => {
            this.initRequest(request, response);
        });
        this.router.post('/verify', (request, response) => {
            this.verifyRequest(request, response);
        });
    }
    initRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet } = req.body;
            const nonce = (0, uuid_1.v4)();
            const dbResp = new NonceModel_1.NonceModel({ wallet, nonce });
            yield dbResp.save();
            res.status(200).json({ nonce });
        });
    }
    verifyRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet, signature } = req.body;
            const nonce = yield NonceModel_1.NonceModel.findOne({ wallet }).exec();
            //check signature
        });
    }
}
exports.DbController = DbController;
