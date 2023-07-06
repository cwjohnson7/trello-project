const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  firstName: String,
  lastName: String,
  org: { type: Schema.Types.ObjectId, ref: "organization"}
})

module.exports = mongoose.model("user", UserSchema);