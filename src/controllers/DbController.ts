import { Router, Request, Response, response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { AppRoute } from "../router/app-route";
import { NonceModel } from "../model/NonceModel";
import { ethers } from "ethers";


export class DbController implements AppRoute {
  public route: string = "/db";
  router: Router = Router();

  constructor() {

    this.router.post('/init', (request, response) => {
        this.initRequest(request, response)
    });

    
  }

  public async initRequest(req: Request, res: Response) {
    const { wallet } = req.body;
    const nonce = uuidv4();
    const dbResp = new NonceModel({wallet, nonce});

    await dbResp.save();
    
    res.status(200).json({nonce});
  }

  public async verifyRequest(req: Request, res: Response) {
    const {wallet, signature} = req.body;
    const nonce = await NonceModel.findOne({wallet}).exec();

    const signer = await ethers.verifyMessage(nonce?.nonce ?? "", signature);

    if (signer != wallet) {
        res.status(401).json({msg: "Bad signature!"});
        return;
    }

    res.status(200).json({})
  }

}
