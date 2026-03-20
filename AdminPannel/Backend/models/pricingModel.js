const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({

plan:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

listings:{
type:String,
required:true
},

users:{
type:String,
required:true
},

api:{
type:String,
enum:["Yes","No"],
default:"No"
},

status:{
type:String,
enum:["Active","Inactive"],
default:"Active"
},

features:[
{
type:String
}
]

},{timestamps:true});

const Pricing = mongoose.model("Pricing",pricingSchema);

module.exports = Pricing;