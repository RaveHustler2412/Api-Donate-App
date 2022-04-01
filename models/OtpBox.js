const mongoose = require("mongoose");

const otpboxSchema = new mongoose.Schema({
  
otp_id: {
    type: String,
},
otp:{
    type:Number,
}
 
});

module.exports = mongoose.model("Otpbox", otpboxSchema);
