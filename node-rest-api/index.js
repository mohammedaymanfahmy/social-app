const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

//ROUTERSS
const userRoute = require("./routers/users");
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {}, (err) => {
  if (err) console.log(err.message);
  else console.log("mongdb is connected");
});

//my middelwares
app.use(express.json()); // json parse
app.use(helmet()); // for security
app.use(morgan("common")); //logger tool

//Apis

app.use("/api/users", userRoute);

app.use("/api/auth", authRoute);

app.use("/api/posts", postRoute);
//run Server
app.listen(8800, () => {
  console.log("Server Is Running...");
});
