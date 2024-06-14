const expressForm = require("express-form");

const {filter, validate} = expressForm;

const createBarForm = expressForm(
	filter("name").trim(),
	filter("address").trim(),
	filter("tel").trim(),
	filter("email").trim(),
	filter("description").trim(),
	validate("name").required().isString().maxLength(255),
	validate("address").required().isString().maxLength(255),
	validate("tel").isString().maxLength(10),
	validate("email").required().isEmail().maxLength(128),
	validate("description").isString(),
);

module.exports = createBarForm;