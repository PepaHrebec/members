const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, maxLength: 100, required: true },
  last_name: { type: String, maxLength: 100, required: true },
  username: { type: String, maxLength: 100, required: true },
  password: { type: String, maxLength: 100, required: true },
  status: { type: String },
});

UserSchema.virtual("name").get(function () {
  return `${this.first_name}.${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
