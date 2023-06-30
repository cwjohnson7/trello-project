const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: String,
  org: { type: Schema.Types.ObjectId, ref: "organization" },
  lists: [{ type: Schema.Types.ObjectId, ref: "list"}]
})

module.exports = mongoose.model("board", BoardSchema);