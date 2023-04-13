exports.user_sign_up_get = (req, res, next) => {
  res.render("sign_up", {
    title: "Sign-up",
  });
};

exports.user_sign_up_post = (req, res, next) => {};
