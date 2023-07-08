const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  cardId: { type: Schema.Types.ObjectId, ref: "card" },
  text: String
})

module.exports = mongoose.model("comment", CommentSchema);