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

exports.messages_post = [
  body("title").trim().escape().isLength({ min: 1 }),
  body("text").trim().escape().isLength({ min: 1 }),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      res.redirect("/messages");
    }
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      timestamp: new Date(),
      author: req.user.id,
    });
    message
      .save()
      .then(() => {
        return res.redirect("/messages");
      })
      .catch((err) => next(err));
  },
];

exports.messages_delete = (req, res, next) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.redirect("/messages");
    })
    .catch((err) => next(err));
};
