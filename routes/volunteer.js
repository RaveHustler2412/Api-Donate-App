const router = require("express").Router();
const uuid = require("uuid").v4;
const ProxyDB = require("../models/ProxyDB");
const Ngo = require("../models/Ngo");
const Otpbox = require("../models/Otpbox");
const nodemailer = require("nodemailer");
const Volunteer = require("../models/Volunteer");

router.post("/pendingVolunteer", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
   Volunteer.find({},(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        res.send(result)
    }
})

})

module.exports = router;

