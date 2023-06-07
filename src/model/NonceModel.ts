import {model, Schema} from "mongoose";

export interface INonce {
    userAddress: string;
    nonce: string;
}

export const NonceSchema = new Schema<INonce>({
    userAddress: String,
    nonce: String
},
{
    collection: "nonces"
});

export const NonceModel = model<INonce>("nonces", NonceSchema);