const expressForm = require("express-form");

const {filter, validate} = expressForm;

const createOrderForm = expressForm(
	filter("name").trim(),
	filter("price").toFloat(),
	filter("date"),
	validate("name").required().isString().maxLength(255),
	validate("price").required().isNumeric(),
	validate("date").isDate(),
);

module.exports = createOrderForm;