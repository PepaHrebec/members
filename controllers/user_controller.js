const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.user_sign_up_get = (req, res, next) => {
  res.render("sign_up", {
    title: "Sign-up",
    error: "None",
  });
};

exports.user_sign_up_post = [
  body("username")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("Username must be at least 3 characters."),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 3, max: 100 })
    .withMessage("Password must be at least 3 characters."),
  body("conf_password").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error("Passwords must be the same");
    return true;
  }),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.render("sign_up", {
        title: "Sign-up",
        error: errs,
      });
    }

    User.find({ username: req.body.username }).then((results) => {
      if (results.length > 0) {
        return res.render("sign_up", {
          title: "Sign-up",
          error: "User exists",
        });
      }
    });

    bcrypt.hash(req.body.password, 10, (err, hashedPasswd) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        username: req.body.username,
        password: hashedPasswd,
        status: false,
      });
      user
        .save()
        .then(() => res.redirect("/"))
        .catch((err) => {
          return next(err);
        });
    });
  },
];
