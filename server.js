const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const authRoute = require("./routes/auth");
// const registerRoute = require("./routes/register");
// const generateSAT=require("./routes/GenerateSAT");
// const verifySAT=require("./middleware/VerifyToken");

//Connect to DB
// mongoose.connect(
//   'mongodb://localhost:27017/donate',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     },
//     () => {
//       console.log("DB connected");
//     }
//   );

// mongoose.connect('mongodb://localhost:27017/donate')




// // //Middlewares
app.use(express.json());

// // //Routes Middleware
app.use("/api/auth", authRoute);
// app.use("/api/register", registerRoute);
// app.use("/api/SAT", generateSAT);
// app.use("api/SAT",verifySAT)






app.listen(7000, function () { 
    console.log("Server is running on port 7000");
});