const router = require("express").Router();
//Initializes an instance of the Router class.
const User = require("../../db/model/User");
const bcrypt = require("bcryptjs");
//imports the user model and the BcryptJS Library
// BcryptJS is a no setup encryption tool
require("dotenv").config();
const tokenExpiration = process.env.TOKEN_EXPIRATION || 3600;
const secret = process.env.SECRET || "the default secret";
//gives us access to our environment variables
//and sets the secret object.
const passport = require("passport");
const jwt = require("jsonwebtoken");
//imports Passport and the JsonWebToken library for some utilities

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register User.
 *     parameters:
 *         name
 *         emailAddress
 *         username
 *         password
 *          role
 *     responses:
 *       200:
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: user
 */
router.post("/register", (req, res) => {
  User.findOne({ emailAddress: req.body.emailAddress }).then((user) => {
    if (user) {
      let error = "Email Address Exists in Database.";
      return res.status(400).json(error);
    } else {
      const newUser = new User({
        name: req.body.name,
        userName: req.body.username,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        role: 002,
        lastConnection: new Date(),
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json(err));
        });
      });
    }
  });
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user.
 *     parameters:
 *        email
 *        password
 *     responses:
 *       200:
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: user
 *                   properties:
 *                    success:
 *                      type: boolean
 *                      required: true
 *                    token:
 *                      type: String
 *                      required: true
 */
router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ emailAddress: email }).then((user) => {
    if (!user) {
      let error = "No Account Found";
      return res.status(404).json(error);
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log(tokenExpiration);
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.userName,
        };
        jwt.sign(
          payload,
          secret,
          { expiresIn: tokenExpiration },
          (err, token) => {
            if (err)
              res.status(500).json({ error: "Error signing token", raw: err });

            //record the last Connection
            user.lastConnection = new Date();
            user
              .save()
              .then((user) => {
                user.password = "";
                res.json({
                  user: user,
                  token: `BEARER ${token}`,
                  tokenExpiration: tokenExpiration,
                });
              })
              .catch((err) => res.status(400).json(err));
          }
        );
      } else {
        let error = "Password is incorrect";
        res.status(400).json(error);
      }
    });
  });
});

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout.
 *     responses:
 *       200
 */
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
