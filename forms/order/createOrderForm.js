const expressForm = require("express-form");
const {OrderStatus} = require("../../models/Order");

const {filter, validate} = expressForm;

const createOrderForm = expressForm(
	filter("name").trim(),
	filter("price"),
	filter("date"),
	filter("BarId").toInt(),
	validate("name").required().isString().maxLength(255),
	validate("price").required().isNumeric(),
	validate("date").isDate(),
	validate("BarId").required().isNumeric(),
);

function orderStatusValidator(value, source) {
	if (!Object.values(OrderStatus).includes(value)) {
		throw new Error();
	}
}

module.exports = createOrderForm;