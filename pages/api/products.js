import { mongooseConnect } from "@/lib/mongooseconnect";
import { Product } from "@/models/Product";
import IncomingForm from "formidable-serverless";

export default async function handler(req, res) {
    
    await mongooseConnect();
    const form = new IncomingForm();
    console.log(form);
    form.on('fileBegin', function(name, file) {
        console.log(name);
        console.log('*****************inside filebeginning call********************');
        console.log(file);
    });
    form.on('file', function(name, file) {
        console.log('*******************inside file call******************');
        console.log(name);
        console.log('*************************************');
        console.log(file);
    });
    if(req.method === 'POST'){
        form.parse(req, (err, fields, files) => {
            console.log(files)
            console.log('***************in parse method**********************');
            if(err){
                console.log('******************error********************');
                console.log(err);
                console.log('*************************************');
            }
            return;
        });
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
export const config = {
  api: {
    bodyParser: false,
  },
};