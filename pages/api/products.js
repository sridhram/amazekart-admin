import { mongooseConnect } from "@/lib/mongooseconnect";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
    
    await mongooseConnect();

    if(req.method === 'POST'){
        await Product.create(req.body)
        res.status(201).send('OK');
    }else if(req.method === 'PUT'){
        await Product.findByIdAndUpdate(req.body._id,{
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
        }).then(() => {
            res.status(204).send('OK');
        }).catch(err => console.log(err));
        
    }else if(req.method === 'DELETE'){
        console.log(req.query.id);
        if(req.query?.id){
            Product.findByIdAndDelete(req.query.id).then(() => {
                res.status(204).send('OK');
            }).catch(err => console.log(err));
        }
    }else{
        let response;
        if(req.query?.id){
            response = await Product.findById(req.query.id);
        }else{
            response = await Product.find();
        }
        res.status(200).json(response)
    }

}