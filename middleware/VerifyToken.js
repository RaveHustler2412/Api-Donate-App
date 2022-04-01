const router=require("express").Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY="Secret_key"

const uuid = require("uuid").v4;



router.post("/verifySAT",(req,res)=>{

  

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

})

module.exports = router;