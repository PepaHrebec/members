const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, maxLength: 100, required: true },
  password: { type: String, maxLength: 100, required: true },
  status: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);
