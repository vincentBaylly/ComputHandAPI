const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = Activity = mongoose.model("Activity", ActivitySchema);
