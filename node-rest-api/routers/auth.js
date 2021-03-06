const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { findById } = require("../models/User");

//Regester
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    hashedPAssword = await bcrypt.hash(req.body.password, salt);

    const existsUsername = await User.findOne({ username: req.body.username });
    const existsEmail = await User.findOne({ email: req.body.email });

    if (existsEmail) {
      return res.status(400).json("this Email is already exests");
    }
    if (existsUsername) {
      return res.status(400).json("this User name is already exests");
    } else {
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPAssword,
      });
      //send user to data base
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("USER NOT FOUND ");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("WRONG PASSWORD");

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
