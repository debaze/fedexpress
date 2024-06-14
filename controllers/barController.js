const { Op } = require("sequelize")
const Bar = require("../models/Bar");
const Beer = require("../models/Beer");

const barController = {
	async readAll(req, res) {
		const barName = req.query.name
		const barCity = req.query.city
		if (barName) {
			return await barController.readBarsByName(req, res, barName)
		}
		if (barCity) {
			return await barController.readBarsByCity(req, res, barCity)
		}

		try {
			const result = await Bar.findAll()
			return res.status(200).send(result)
		} catch (error) {
			return res.status(500).send({ message: 'Error read bar: ', error })
		}
	},

	async readBarsByName(req, res, barName) {
		try {
			const result = await Bar.findOne({
				where:
					{ name: barName }
			})
			if (!result) {
				return res.status(404).send({ message: 'bar not found:' })
			}
			return res.status(200).send(result)
		} catch (error) {
			return res.status(500).send({ message: 'Error read bar: ', error })
		}
	},

	async readBarsByCity(req, res, barCity) {
		const city = barCity.trim()
		try {
			const result = await Bar.findAll({
				where: {
					address: {
						[Op.substring]: city,
					}
				},
			});
			return res.status(200).send(result)
		} catch (error) {

			return res.status(500).send({ message: 'Error read city: ', error })
		}
	},

	async read(req, res) {
		const id = req.params.barId
		try {
			const result = await Bar.findByPk(id)
			if (!result) {
				return res.status(404).send({ message: 'Bar missing' });
			}
			return res.status(200).send(result)
		} catch (error) {
			return res.status(500).send({ message: 'Error read bar: ', error })
		}
	},

	async readAverageDegree(request, response) {
		const barId = request.params.barId;
		const bar = await Bar.findByPk(barId);

		if (!bar) {
			return response
				.status(404)
				.json({
					message: "No bar found with the given ID.",
				});
		}

		const beers = await Beer.findAll({
			where: {
				barId,
			},
		});

		const allDegrees = beers.reduce((sum, beer) => sum += beer.degree, 0);
		const averageDegree = allDegrees / beers.length;

		return response
			.status(200)
			.json({
				averageDegree,
			});
	},

	async create(req, res) {
		if (!req.form.isValid) {
			return res
				.status(400)
				.json({
					message: "Invalid form.",
				});
		}
		const { name, address, tel, email, description } = req.body
		const bar = { name, address, tel, email, description }
		try {
			const result = await Bar.create(bar)
			return res.status(200).send(result)
		} catch (error) {
			return res.status(500).send({ message: 'Error create bar: ', error })
		}
	},

	async update(req, res) {
		if (!req.form.isValid) {
			return res
				.status(400)
				.json({
					message: "Invalid form.",
				});
		}
		const id = req.params.barId
		const { name, address, tel, email, description } = req.body
		const bar = { name, address, tel, email, description }
		try {
			const result = await Bar.update(bar, { where: { id } })
			if (!result) {
				return res.status(404).send({ message: 'Bar missing' });
			}
			const barAfterResult = await Bar.findByPk(id)
			return res.status(200).send(barAfterResult)
		} catch (error) {
			return res.status(500).send({ message: 'Error update bar: ', error })
		}

	},
	async delete(req, res) {
		const id = req.params.barId
		try {
			const result = await Bar.destroy({ where: { id } })
			if (!result) {
				return res.status(404).send({ message: 'Bar missing' });
			}
			return res.status(200).send({ message: 'Bar delete with success' });

		} catch (error) {
			return res.status(500).send({ message: 'Error delete bar: ', error })
		}
	},
};

module.exports = barController;