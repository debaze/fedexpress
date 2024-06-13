const Bar = require("../models/Bar");
const {Order} = require("../models/Order");

const orderController = {
	async readAll() {
		//
	},
	async readOne(request, response) {
		const orderId = request.params.orderId;
		const order = await Order.findByPk(orderId);

		if (!order) {
			return response
				.status(404)
				.json("No order found with the given ID.");
		}

		return response
			.status(200)
			.json(order);
	},
	async create(request, response) {
		if (!request.form.isValid) {
			return response
				.status(400)
				.json("Invalid form.");
		}

		const order = await Order.create(request.form);

		return response
			.status(201)
			.json(order);
	},
	async update() {
		//
	},
	async delete(request, response) {
		const orderId = request.params.orderId;
		const order = await Order.findByPk(orderId);

		if (!order) {
			return response
				.status(404)
				.json("No order found with the given ID.");
		}

		Order.destroy({
			where: orderId,
		});

		return response
			.status(200)
			.json("The order has been deleted.");
	},
};

module.exports = orderController;