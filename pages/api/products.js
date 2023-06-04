import { mongooseConnect } from "@/lib/mongooseconnect";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    
    await mongooseConnect();

    if(req.method === 'POST'){
        const product = await Product.create(req.body)
        res.status(204).json(product)
    }else if(req.method === 'GET'){
        let response;
        if(req.query?.id){
            response = await Product.findById(req.query.id);
        }else{
            response = await Product.find();
        }
        res.status(200).json(response)
    }

}