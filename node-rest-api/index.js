const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routers/users");

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { userNewUrlParser: true }, () => {
  console.log("Connected to mongoDB");
});

//my middelwares
app.use(express.json()); // json parse
app.use(helmet()); // for security
app.use(morgan("common")); //logger tool

//Api's

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

app.get("/users", (req, res) => {
  res.send("welcome to users");
});

//run Server
app.listen(8800, () => {
  console.log("Server Is Running...");
});
