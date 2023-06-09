var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/user_controller");
const message_controller = require("../controllers/message_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

router.get("/sign-up", user_controller.user_sign_up_get);

router.post("/sign-up", user_controller.user_sign_up_post);

router.get("/log-in", user_controller.user_log_in_get);

router.post("/log-in", user_controller.user_log_in_post);

router.get("/status-change", user_controller.status_change_get);

router.post("/status-change", user_controller.status_change_post);

router.get("/messages", message_controller.messages_get);

router.post("/messages", message_controller.messages_post);

router.post("/messages/:id/delete", message_controller.messages_delete);

router.get("/log-out", user_controller.logout);

module.exports = router;
