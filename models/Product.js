const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
    name:{type:String, required:true},
    description:String,
    price:{type:Number, required:true},
    date:{type:Date, default: Date.now}
})

export const Product = models.Product || model('Product', ProductSchema);