const Bar = require("../models/Bar");
const Beer = require("../models/Beer");

const beerController = {
  async readAll(req, res) {
    const beers = await Beer.findAll();
    return res.status(200).send(beers);
  },
  async read(req, res) {
    const id = req.params.beerId;
    const b = await Beer.findByPk(id);
    if (!b) {
      return res.status(404).send({ message: "Beer not found" });
    }
    return res.status(200).send(b);
  },
  async create(req, res) {
    if (!req.form.isValid) {
      return res.status(400).send({ message: "Invalid form" });
    }

    const barId = req.params.barId;

    const bar = await Bar.findByPk(barId);
    if (!bar) {
      return res.status(400).send({ message: "Invalid barId" });
    }

    const { name, degree, price, description } = req.body;
    const beer = { name, degree, price, description, BarId: barId };

    const b = await Beer.create(beer);
    return res.status(201).send({ beer: b, message: "Beer created" });
  },
  async update(req, res) {
    if (!req.form.isValid) {
      return res.status(400).send({ message: "Invalid form" });
    }

    const id = req.params.beerId;
    const barId = req.body.barId;

    const bar = await Bar.findByPk(barId);
    if (!bar) {
      return res.status(400).send({ message: "Invalid barId" });
    }

    const { name, degree, price, description } = req.body;
    const beer = { name, degree, price, description, BarId: barId };

    const queryResult = await Beer.update(beer, { where: { id } });
    if (!queryResult) {
      return res.status(404).send("Beer not found");
    }

    const beerUpdated = await Beer.findByPk(id);

    return res.status(200).send({ message: "Beer updated", beer: beerUpdated });
  },
  async delete(req, res) {
    const id = req.params.beerId;
    const queryResult = await Beer.destroy({ where: { id } });
    if (!queryResult) {
      return res.status(404).send("Beer not found");
    }
    return res
      .status(200)
      .send({ message: "Beer deleted", result: queryResult });
  },
};

module.exports = beerController;
