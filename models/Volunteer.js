const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name:{
    type:String,
  },
  phone:{
type:Number
  },
  whatsapp:{
    type:Number

  },
  selected_ngo:{
    type:String

  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("pendingvolunteer", volunteerSchema);
