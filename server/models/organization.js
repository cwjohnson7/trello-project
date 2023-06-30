const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgSchema = new Schema({
  name: String,
  boards: [{ type: Schema.Types.ObjectId, ref: "board" }]


})

module.exports = mongoose.model("organization", OrgSchema);