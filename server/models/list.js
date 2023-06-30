const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "card" }]
})

module.exports = mongoose.model("list", ListSchema);