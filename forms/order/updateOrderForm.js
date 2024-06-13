const expressForm = require("express-form");
const {OrderStatus} = require("../../models/Order");

const {filter, validate} = expressForm;

const updateOrderForm = expressForm(
	filter("name").trim(),
	filter("price"),
	filter("date"),
	filter("status").toInt(),
	validate("name").isString().maxLength(255),
	validate("price").isNumeric(),
	validate("date").isDate(),
	validate("status").customValidator(orderStatusValidator),
);

function orderStatusValidator(value, source) {
	if (!Object.values(OrderStatus).includes(value)) {
		throw new Error();
	}
}

module.exports = updateOrderForm;