const Beer = require("../models/Beer");
const BeerOrder = require("../models/BeerOrder");
const {Order, OrderStatus} = require("../models/Order");

const beerOrderController = {
	async create(request, response) {
		const orderId = request.params.orderId;
		const order = await Order.findByPk(orderId);

		if (!order) {
			return response
				.status(404)
				.json({
					message: "No order found with the given ID.",
				});
		}

		if (order.status == OrderStatus.DONE) {
			return response
				.status(409)
				.json({
					message: "The order has already been processed and is now read-only.",
				});
		}

		const beerId = request.params.beerId;
		const beer = await Beer.findByPk(beerId);

		if (!beer) {
			return response
				.status(404)
				.json({
					message: "No beer found with the given ID.",
				});
		}

		const existingBeerOrder = await BeerOrder.findOne({
			where: {
				beerId,
				orderId,
			},
		});

		if (existingBeerOrder) {
			return response
				.status(409)
				.json({
					message: "The beer is already associated with the order.",
				});
		}

		const beerOrder = await BeerOrder.create({
			BeerId: beerId,
			OrderId: orderId,
		});

		return response
			.status(418)
			.json({
				message: "Beer added to order.",
				beerOrder,
			});
	},
	async delete(request, response) {
		const orderId = request.params.orderId;
		const order = await Order.findByPk(orderId);

		if (!order) {
			return response
				.status(404)
				.json({
					message: "No order found with the given ID.",
				});
		}

		if (order.status == OrderStatus.DONE) {
			return response
				.status(409)
				.json({
					message: "The order has already been processed and is now read-only.",
				});
		}

		const beerId = request.params.beerId;
		const beer = await Beer.findByPk(beerId);

		if (!beer) {
			return response
				.status(404)
				.json({
					message: "No beer found with the given ID.",
				});
		}

		const beerOrder = await BeerOrder.findOne({
			where: {
				beerId,
				orderId,
			},
		});

		if (!beerOrder) {
			return response
				.status(404)
				.json({
					message: "The beer is not associated with the order.",
				});
		}

		beerOrder.destroy();

		return response
			.status(200)
			.json({
				message: "Beer removed from order.",
			});
	},
};

module.exports = beerOrderController;
