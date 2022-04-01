const mongoose = require("mongoose");

const proxydbSchema = new mongoose.Schema({
  email: {
    type: String,
  },
 
});

module.exports = mongoose.model("ProxyDB", proxydbSchema);
