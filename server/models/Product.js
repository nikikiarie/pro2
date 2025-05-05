const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true,  index: { unique: false }},
  img: { type: String },
  categories: { type: [String], required: true },
  size: { type: [String], default: [] },
  color:{type:[], default: []},
  price:{ type: Number, required: true},
  inStock:{type:Boolean,default:true}
},{timestamps:true});


module.exports = mongoose.model('Product',productSchema)