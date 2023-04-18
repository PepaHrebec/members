const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.messages_get = (req, res, next) => {
  Message.find({})
    .populate("author")
    .then((results) => {
      res.render("message", {
        title: "Messages",
        user: req.user,
        messages: results,
      });
    });
};
