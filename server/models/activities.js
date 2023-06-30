const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  list: { type: Schema.Types.ObjectId, ref: "list"},
  card: { type: Schema.Types.ObjectId, ref: "card" },
  text: String
})

module.exports = mongoose.model("activity", ActivitySchema);