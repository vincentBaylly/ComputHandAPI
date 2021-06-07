const router = require("express").Router();
//Initializes an instance of the Router class.
const User = require("../../db/model/User");

// get all user items in the db with a specific role
router.post("/list", function (req, res, next) {
  const role = req.body.role;
  User.find({ role: role }, function (error, users) {
    if (error) {
      return next(new Error(error));
    }

    res.json(users); // return all users with the specific role
  });
});

router.get("/get/:email", function (req, res, next) {
  User.findOne({ emailAddress: req.params.email }, function (error, user) {
    if (error) {
      //TODO add multilanguage management for error message
      console.error(error);
      return next(new Error("User was not found"));
    }
    //TODO add multilanguage management for message
    res.json(user);
  });
});

module.exports = router;
