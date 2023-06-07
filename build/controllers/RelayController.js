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
exports.RelayController = void 0;
const express_1 = require("express");
const ethers_1 = require("ethers");
require('dotenv').config();
const Ponto = require('../contract/Ponto');
class RelayController {
    constructor() {
        this.route = "/relay";
        this.router = (0, express_1.Router)();
        this.router.post('/comment', (request, response) => {
            this.addComment(request, response);
        });
    }
    addComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet } = req.body;
            const privateKey = (_a = process.env.PRIVATE_KEY) !== null && _a !== void 0 ? _a : "";
            const provider = new ethers_1.ethers.JsonRpcProvider('https://sepolia.infura.io/v3/d9cdb64219b94ef3a7cd221d77a02400');
            const relayWallet = new ethers_1.ethers.Wallet(privateKey, provider);
            const contract = new ethers_1.ethers.Contract(Ponto.address, Ponto.abi);
        });
    }
    createAttest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //check signature
        });
    }
}
exports.RelayController = RelayController;
