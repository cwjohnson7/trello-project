const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: String,
  description: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
})

module.exports = mongoose.model("card", CardSchema);