const Pricing = require("../models/PricingModel");


// CREATE PLAN
const createPlan = async (req,res)=>{
try{

const newPlan = new Pricing(req.body);

const savedPlan = await newPlan.save();

res.status(201).json({
success:true,
message:"Pricing Plan Created Successfully",
data:savedPlan
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



// GET ALL PLANS
const getPlans = async (req,res)=>{
try{

const plans = await Pricing.find().sort({createdAt:-1});

res.status(200).json({
success:true,
data:plans
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



// GET SINGLE PLAN
const getSinglePlan = async (req,res)=>{
try{

const plan = await Pricing.findById(req.params.id);

res.status(200).json({
success:true,
data:plan
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



// UPDATE PLAN
const updatePlan = async (req,res)=>{
try{

const updated = await Pricing.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.status(200).json({
success:true,
message:"Pricing Plan Updated",
data:updated
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



// DELETE PLAN
const deletePlan = async (req,res)=>{
try{

await Pricing.findByIdAndDelete(req.params.id);

res.status(200).json({
success:true,
message:"Pricing Plan Deleted"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};


module.exports = {
createPlan,
getPlans,
getSinglePlan,
updatePlan,
deletePlan
};