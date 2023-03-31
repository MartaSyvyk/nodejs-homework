const { Schema, model } = require("mongoose");

const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const joiContactFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiContactSchema, joiContactFavoriteSchema };
