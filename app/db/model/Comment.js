const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  authorId: {
    type: Number,
    required: true,
  },
  taskId: {
    type: Number,
    required: true,
  },
  content: String,
});
module.exports = Comment = mongoose.model("Comment", CommentSchema);
