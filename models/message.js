const mongoose = require("mongoose");
const dayjs = require("dayjs");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("timeFormat").get(function () {
  return dayjs(this.timestamp).format("DD/MM/YYYY");
});

module.exports = mongoose.model("Message", MessageSchema);
