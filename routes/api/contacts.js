const express = require("express");
const {
  getAll,
  getById,
  create,
  deleteById,
  update,
  updateStatusContact,
} = require("../../controller/contacts");
const {
  joiContactSchema,
  joiContactFavoriteSchema,
} = require("../../service/schemas/contact");
const { validate } = require("../../middlewares/validation");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAll);

router.get("/:contactId", auth, getById);

router.post("/", auth, validate(joiContactSchema), create);

router.delete("/:contactId", auth, deleteById);

router.put("/:contactId", auth, validate(joiContactSchema), update);

router.patch(
  "/:contactId/favorite",
  auth,
  validate(joiContactFavoriteSchema),
  updateStatusContact
);

module.exports = router;
