const router = require("express").Router();
const uuid = require("uuid").v4;
const ProxyDB = require("../models/ProxyDB");
const Ngo=require("../models/Ngo");
const Volunteer=require("../models/Volunteer");
const cors = require('cors');

router.post("/NgoRegisterDetail", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body[0][3]);

    const ngo = await Ngo.findOne({ email: req.body[0][3] });
    if (ngo) {
        ngo.unique_id=req.body[0][0];
        ngo.org_name=req.body[0][1];
        ngo.org_phone=req.body[0][2];
        ngo.org_email=req.body[0][3];
        ngo.org_address=req.body[0][4];
        ngo.website_url=req.body[0][5];
        ngo.founder_name=req.body[1][0];
        ngo.founder_phone=req.body[1][1];
        ngo.founder_email=req.body[1][2];
        ngo.pan_number=req.body[1][3];
        ngo.aadhar_number=req.body[1][4];
        ngo.poc_name=req.body[2][0];
        ngo.poc_phone=req.body[2][1];
        ngo.poc_email=req.body[2][2];
        ngo.poc_designation=req.body[2][3];
      ngo.save();
    console.log(ngo);
      return res.json({ message: "Registered" });
    } else {
      return res.json({ message: "Error" });
    }
  
  })

  router.post("/VolunteerRegisterDetail", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const volunteer = await Volunteer.findOne({ email: req.body.email});

    console.log(req.body,volunteer);
    if(volunteer){
      volunteer.name=req.body.name;
      volunteer.phone=req.body.phone;
      volunteer.whatsapp=req.body.whatsapp;
      volunteer.selected_ngo=req.body.selected_ngo;
      volunteer.save()
      return res.json({ message: "Registered" });
    } else {
      return res.json({ message: "Error" });
    }

  })

  module.exports = router;
