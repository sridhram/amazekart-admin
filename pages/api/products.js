import { mongooseConnect } from "@/lib/mongooseconnect";
import { Product } from "@/models/Product";
import multer from "multer";


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    
    await mongooseConnect();
    const storage = multer.diskStorage({
            destination: function(req, file, cb){
                console.log('*************destination*********************');
                cb(null, "public/uploads")
            },
            filename: function(req, file, cb){
                console.log('*********************filename*********************');
                cb(null, `${new Date().toISOString()}_${file.originalname}`)
            }
        })
        const fileFilter = (req, file, cb) => {
            console.log('*********************filefilter*********************');
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/tiff' || file.mimetype === 'image/gif' || file.mimetype === 'image/svg'){
                cb(null, true);
            }else{
                cb({'error' : 'Unsupported file format only JPG/JPEG, PNG, TIFF, SVG or GIF supported'},false)
            }
        }
        const upload = multer({
            storage: storage,
            fileFilter
        });

    if(req.method === 'POST'){
        upload.single(req.body.imagesList[0]);
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