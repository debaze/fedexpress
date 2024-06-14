const Bar = require("../models/Bar");

const barController = {
	async readAll(req, res) {
		try {
			const result = await Bar.findAll()
			return res.status(200).send(result)
		} catch (error) {
			return res.status(500).send({ message: 'Error read bar: ', error })
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
			const barAfterResult = await Bar.findByPk(id)
			if (!result) {
				return res.status(404).send({ message: 'Bar missing' });
			}
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