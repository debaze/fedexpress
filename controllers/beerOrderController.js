const Beer = require("../models/Beer");
const BeerOrder = require("../models/BeerOrder");
const {Order} = require("../models/Order");

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

		const beerOrder = BeerOrder.build({
			BeerId: beerId,
			OrderId: orderId,
		});

		beerOrder.save();

		return response
			.status(200)
			.json({
				message: "Beer added to order.",
				beerOrder,
			});
	},
	async delete(request, response) {
		// const orderId = request.params.orderId;
		// const beerId = request.params.beerId;
	},
};

module.exports = beerOrderController;