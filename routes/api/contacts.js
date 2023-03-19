const express = require("express");
const {
  getAll,
  getById,
  create,
  deleteById,
  update,
  updateStatusContact,
} = require("../../controller/index");
const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", deleteById);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
