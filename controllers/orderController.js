const Bar = require("../models/Bar");
const {Order} = require("../models/Order");

const orderController = {
	async read(request, response) {
		const orderId = request.params.orderId;
		const order = await Order.findByPk(orderId);

		if (!order) {
			return response
				.status(404)
				.json({
					message: "No order found with the given ID.",
				});
		}

		return response
			.status(200)
			.json(order);
	},
	async readByBar(request, response) {
		const barId = request.params.barId;
		const bar = await Bar.findByPk(barId);

		if (!bar) {
			return response
				.status(404)
				.json({
					message: "No bar found with the given ID.",
				});
		}

		const orders = await Order.findAll({
			where: {
				BarId: barId,
			},
		});

		return response
			.status(200)
			.json(orders);
	},
	async create(request, response) {
		if (!request.form.isValid) {
			return response
				.status(400)
				.json({
					message: "Invalid form.",
				});
		}

		const order = await Order.create(request.form);

		return response
			.status(201)
			.json({
				order,
				message: "The order has been created.",
			});
	},
	async update(request, response) {
		if (!request.form.isValid) {
			return response
				.status(400)
				.json({
					message: "Invalid form.",
				});
		}

		const barId = request.form.BarId;
		const bar = await Bar.findByPk(barId);

		if (!bar) {
			return response
				.status(400)
				.json({
					message: "Invalid form: No bar found with the given ID.",
				});
		}

		const orderId = request.params.orderId;
		await Order.update(request.form, {
			where: {
				id: orderId,
			},
		});
		const order = await Order.findByPk(orderId);

		if (!order) {
			return response
				.status(404)
				.json({
					message: "No order found with the given ID.",
				});
		}

		return response
			.status(200)
			.json({
				order,
				message: "The order has been updated.",
			});
	},
	async delete(request, response) {
		const orderId = request.params.orderId;
		const order = Order.destroy({
			where: {
				id: orderId,
			},
		});

		if (!order) {
			return response
				.status(404)
				.json({
					message: "No order found with the given ID.",
				});
		}

		return response
			.status(200)
			.json({
				message: "The order has been deleted.",
			});
	},
};

module.exports = orderController;