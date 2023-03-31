const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controller/users.js");
const { validate } = require("../../middlewares/validation");
const {
  registerJoiSchema,
  loginJoiSchema,
  SubscriptionUpdJoiSchema,
} = require("../../service/schemas/user");
const { auth } = require("../../middlewares/auth");

router.post("/register", validate(registerJoiSchema), register);
router.post("/login", validate(loginJoiSchema), login);
router.get("/current", auth, getCurrent);
router.get("/logout", auth, logout);
router.patch("/", auth, validate(SubscriptionUpdJoiSchema), updateSubscription);

module.exports = router;
