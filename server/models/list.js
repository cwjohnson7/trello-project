const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: String,
  org: { type: Schema.Types.ObjectId, ref: "organization" },
  board: { type: Schema.Types.ObjectId, ref: "board" },
  cards: [{ type: Schema.Types.ObjectId, ref: "card" }]
})

module.exports = mongoose.model("list", ListSchema);