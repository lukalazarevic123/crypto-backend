import { Router, Request, Response, response } from "express";
import { AppRoute } from "../router/app-route";
import { NonceModel } from "../model/NonceModel";
import { ethers } from "ethers";
import { Ponto } from '../contract/Ponto';
require('dotenv').config();

export class RelayController implements AppRoute {
  public route: string = "/relay";
  router: Router = Router();

  constructor() {

    this.router.post('/review',(request, response) => {
        this.addReview(request, response)
    });
  }

  public async verifyRequest(wallet: string, signature: string) {
    const nonce = await NonceModel.findOne({wallet}).exec();

    const signer = ethers.verifyMessage(nonce?.nonce ?? "", signature);

    return signer == wallet
  }

  public async addReview(req: Request, res: Response) {
    const { 
        wallet, 
        signature,
        groupId,
        review,
        merkleTreeRoot,
        nullifierHash,
        proof 
    } = req.body;
    
    if(!this.verifyRequest(wallet, signature)){
        response.status(401).json({msg: "Bad signature!"});
        return;
    }

    const privateKey = process.env.PRIVATE_KEY ?? "";
    
    const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/d9cdb64219b94ef3a7cd221d77a02400');
    const relayWallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(Ponto.address, Ponto.abi, relayWallet);

    
    
    const tx = await contract.sendReview(groupId, review, merkleTreeRoot, nullifierHash, proof);
    const txInfo = await tx.wait();

    res.status(200).json({...txInfo});
    return;
  }

  public async createAttest(req: Request, res: Response) {
    const {
        wallet,
        signature,
        schema,
        recipient,
        expirationTime,
        revocable,
        refUID,
        data,
        value,
    } = req.body;

    if(!this.verifyRequest(wallet, signature)){
        response.status(401).json({msg: "Bad signature!"});
        return;
    }

    const privateKey = process.env.PRIVATE_KEY ?? "";
    
    const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/d9cdb64219b94ef3a7cd221d77a02400');
    const relayWallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(Ponto.address, Ponto.abi, relayWallet);

    const schemaBytes = ethers.encodeBytes32String(schema);
    const dataBytes = ethers.encodeBytes32String(data);
    const tx = await contract.attest(schema, [recipient, expirationTime, revocable, refUID, data, value], { value });

    const txInfo = await tx.wait();

    res.status(200).json({...txInfo})
  }

}

