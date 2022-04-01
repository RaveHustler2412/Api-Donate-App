const router = require("express").Router();
const uuid = require("uuid").v4;
const ProxyDB = require("../models/ProxyDB");
const Ngo = require("../models/Ngo");
const Otpbox = require("../models/Otpbox");
const nodemailer = require("nodemailer");

const cors = require("cors");
const Volunteer = require("../models/Volunteer");

let transporter = nodemailer.createTransport({
  host: "clgproject168@gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "clgproject168@gmail.com",
    pass: "ravehustler2412",
  },
});

function generateOtp() {
  var otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

router.post("/test", cors(), (req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.send(req.body);
});

router.post("/otpregister", async (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");

  function SendOtp(otpValue) {
    var mailOptions = {
      to: req.body.email,
      subject: "Otp for registration is: ",
      html:
        "<h1>OTP for Email Verification</h1>" +
        "<h3 style='font-weight:bold;'>" +
        otpValue +
        "</h3>", // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.render("otp");
    });
  }

  if (req.body.type == "ngo") {
    const emailExist = await Ngo.find({org_email:req.body.email });

    if (emailExist.length!=0) {
      console.log(emailExist)
      res.json({ message: "Email already exists" });
    } else {
      ProxyDB.find({
        email: req.body.email,
      })
        .then((doc) => {
          if (doc.length > 0) {
            if (doc[0].email == req.body.email) {
              var otp = generateOtp();
              var otp_id = uuid();
              const otpbox = new Otpbox({
                otp_id: otp_id,
                otp: otp,
              });
              try {
                otpbox.save();
                SendOtp(otp); //send otp to ngo
                return res.json({
                  message: "OTP sent to your email",
                  otp_id,
                });
              } catch (err) {
                console.log(err);
              }
            }
          } else {
            // res.header("Access-Control-Allow-Origin", "*");
            return res.json({ message: "enter darpan registered number" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else {
    const emailExist = await Volunteer.findOne({ email: req.body.email });
    if (emailExist) {
      res.json({ message: "Volunteer email already exists" });
    } else {
      var otp = generateOtp();
      var otp_id = uuid();
      const otpbox = new Otpbox({
        otp_id: otp_id,
        otp: otp,
      });
      try {
        otpbox.save();
        SendOtp(otp); //send otp to ngo
        return res.json({
          message: "OTP sent to your email",
          otp_id,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
});

router.post("/VerifyOtp", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);

  try {
    const otpbox = await Otpbox.findOne({ otp_id: req.body.otp_id });
    console.log("this is otp", otpbox);
    if (otpbox.otp == req.body.otp) {
      try {
        if (req.body.type == "ngo") {
          const ngo = new Ngo({
            id: uuid(),
            org_email: req.body.email,
          });
          ngo.save();
        } else {
          const volunteer = new Volunteer({
            id: uuid(),
            email: req.body.email,
          });
          volunteer.save();
        }

        return res.json({ message: "success" });
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.json({ message: "Invalid OTP" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
