const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //001-admin
  //002-member
  role: {
    type: String,
    required: true,
  },
  lastConnection: {
    type: Date,
    required: true,
  },
});
module.exports = User = mongoose.model("User", UserSchema);
