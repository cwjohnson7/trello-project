const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const ActivitySchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "user" },
  // list: { type: Schema.Types.ObjectId, ref: "list"},
  cardId: { type: Schema.Types.ObjectId, ref: "card" },
  // comment: { type: Schema.Types.ObjectId, ref: "comment" },
  //could create string on client side
  text: String
})

module.exports = mongoose.model("activity", ActivitySchema);
