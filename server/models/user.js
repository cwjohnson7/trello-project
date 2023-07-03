const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  firstName: String,
  lastName: String,
  org: String
})

module.exports = mongoose.model("user", UserSchema);