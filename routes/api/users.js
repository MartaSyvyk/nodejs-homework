const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controller/users.js");
const { validate } = require("../../middlewares/validation");
const {
  registerJoiSchema,
  loginJoiSchema,
  subscriptionUpdJoiSchema,
  } = require("../../service/schemas/user");
const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

router.post("/register", validate(registerJoiSchema), register);
router.post("/login", validate(loginJoiSchema), login);
router.get("/current", auth, getCurrent);
router.get("/logout", auth, logout);
router.patch("/", auth, validate(subscriptionUpdJoiSchema), updateSubscription);
router.patch("/avatars", auth, upload.single("image"),  updateAvatar);

module.exports = router;
