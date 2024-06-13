const expressForm = require("express-form");
const {OrderStatus} = require("../../models/Order");

const {filter, validate} = expressForm;

const updateOrderForm = expressForm(
	filter("name").trim(),
	filter("price"),
	filter("date"),
	filter("status").toInt(),
	validate("name").required().isString().maxLength(255),
	validate("price").required().isNumeric(),
	validate("date").isDate(),
	validate("status").required().customValidator(orderStatusValidator),
);

function orderStatusValidator(value, source) {
	if (!Object.values(OrderStatus).includes(value)) {
		throw new Error();
	}
}

module.exports = updateOrderForm;