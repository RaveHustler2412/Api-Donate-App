const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const SECRET_KEY = "Secret_key";
const CryptoJS = require("crypto-js");
const Ngo=require("../models/Ngo");
const Volunteer = require("../models/Volunteer");
const fs = require("fs");
const path = require("path");

const uuid = require("uuid").v4;
function aesDecrypt(word) {
  var keys = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, keys, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}
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

router.post("/generateSAT", async (req, res) => {
  function SendSAT(token) {
    var mailOptions = {
      to: req.body.email,
      subject: "Login Approved",
      html:
        "<h1>Secure Access Token</h1>" +
        "<h3 style='font-weight:bold;'>" +
        token +
        "</h3>", // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.render("token");
    });
  }
  function aesEncrypt(content) {
    const parsedkey = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const encrypted = CryptoJS.AES.encrypt(content, parsedkey, {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  function generateJWT(userid, name) {
  
    return jwt.sign({ id: userid, user: name}, SECRET_KEY, {
      expiresIn: "30d",
    });
  }


  const EuserId = aesEncrypt(req.id);

  const token = generateJWT(EuserId, req.body.name);
  console.log("SAT is",token);
  // SendSAT(token);
  
  const ngo = await Ngo.findOne({ email: req.email});
  if(ngo){
    ngo.encrypted_login_id = EuserId;
  }
  ngo.save()
  res.json({ message: "SAT has been sent to your email" });

  // res.json({"SAT":token})
});




router.post("/verifySAT", async (req, res) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Payload is ",decoded);

    const ngo=await Ngo.findOne({encrypted_login_id:decoded.id})
    
    if(ngo){
      return res.json({message:"Login Successful"})
    }
    else{
      return res.json({message:"Login Failed"})
    }

    console.log(userid);
  } catch (err) {
   return res.status(401).send(err);
  }
});

router.get("/pendingVolunteer", async (req, res) => {
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

router.get("/video", function (req, res) {
  const range = req.headers.range;
  // if (!range) {
  //     res.status(400).send("Requires Range header");
  // }

  
  const videoPath = "../uploads/samplebig.mp4"
  const resolvedPath = path.resolve("uploads", videoPath);
  res.sendFile(resolvedPath);
  // const videoSize = fs.statSync(videoPath).size;
  // console.log(videoSize)

});

module.exports = router;
