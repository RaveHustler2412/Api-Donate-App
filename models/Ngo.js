const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  encrypted_login_id: {
    type: String,
  },
  id:{
    type:String,
  },
  unique_id: {
    type: Number,
  },
  org_name:{
    type:String,
  },
  org_phone:{
    type:Number,
  },
  org_email:{
    type:String,
  },
  org_address:{
    type:String,
  },
  website_url:{
    type:String,
  },
    founder_name:{
    type:String,
  },
  founder_phone:{
    type:Number,
  },
  founder_email:{
    type:String,
  },
  pan_number:{
    type:String,
  },
  aadhar_number:{
    type:Number,
  },
    poc_name:{
    type:String,
  },
  poc_phone:{
    type:Number,
  },
  poc_email:{
    type:String,
  },
  poc_designation:{
    type:String,
  }
 
});

module.exports = mongoose.model("Ngo", ngoSchema);
