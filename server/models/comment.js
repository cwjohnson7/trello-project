const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  createdBy: String,
  cardId: { type: Schema.Types.ObjectId, ref: "card" },
  text: String
})

module.exports = mongoose.model("comment", CommentSchema);