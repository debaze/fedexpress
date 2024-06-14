const expressForm = require("express-form");

const { filter, validate } = expressForm;

const createBeerForm = expressForm(
  filter("name").trim(),
  filter("degree").toFloat(),
  filter("price").toFloat(),
  filter("description").trim(),
  validate("name").required().isString().maxLength(255),
  validate("degree").required().isNumeric(),
  validate("price").required().isNumeric(),
  validate("description").isString()
);

module.exports = createBeerForm;
