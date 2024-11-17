const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../models/admin");
const User = mongoose.model("User", userSchema);
const axios = require("axios");
const {SECRET,authenticateJwt} = require('../middlware/auth');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username: name, email, password: hashedPassword });
  await newUser
    .save()
    .then((userInstance) =>
      res
        .status(201)
        .json({
          msg: "User registered successfully",
          user: userInstance,
          token,
        })
    )
    .catch((error) =>
      res.status(500).json({ msg: "Error registering user", error })
    );
});

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    // Validate access token with Google
    const googleResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
    );

    const { email, sub: googleId, name } = googleResponse.data;

    let userInstance = await User.findOne({ email });
    if (!userInstance) {
      userInstance = new User({ email, googleId, name });
      await userInstance.save();
    } else if (!userInstance.googleId) {
      return res
        .status(400)
        .json({ message: 'Email is registered with a different method' });
    }

    const jwtToken = jwt.sign({ id: userInstance._id }, SECRET, {
      expiresIn: '1h',
    });
    res.json({ token: jwtToken, user: { name, email } });
  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(400).json({ message: 'Google authentication failed' });
  }
});



// router.get("/me", authenticateJwt, async (req, res) => {
//   await User.findOne({ _id: req.headers.userId }).then((userInstance) => {
//     if (userInstance) {
//       res.json({ user: userInstance });
//     } else {
//       res.json({ message: "User not logged in" });
//     }
//   });
// });

module.exports = router;
