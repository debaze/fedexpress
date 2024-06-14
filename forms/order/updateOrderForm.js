const expressForm = require("express-form");
const {OrderStatus} = require("../../models/Order");

const {filter, validate} = expressForm;

const updateOrderForm = expressForm(
	filter("name").trim(),
	filter("price").toFloat(),
	filter("date"),
	filter("status").toInt(),
	filter("BarId").toInt(),
	validate("name").required().isString().maxLength(255),
	validate("price").required().isFloat(),
	validate("date").isDate(),
	validate("status").required().customValidator(orderStatusValidator),
	validate("BarId").required().isNumeric(),
);

function orderStatusValidator(value, source) {
	if (!Object.values(OrderStatus).includes(value)) {
		throw new Error();
	}
}

module.exports = updateOrderForm;