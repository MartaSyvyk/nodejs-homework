const express = require("express");
const {
  getAll,
  getById,
  create,
  deleteById,
  update,
  updateStatusContact,
} = require("../../controller/contacts");
const {joiContactSchema, joiContactFavoriteSchema} = require("../../service/schemas/contact")
const {validate} = require("../../middlewares/validation")

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validate(joiContactSchema), create);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validate(joiContactSchema), update);

router.patch("/:contactId/favorite", validate(joiContactFavoriteSchema), updateStatusContact);

module.exports = router;
