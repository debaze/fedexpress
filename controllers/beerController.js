const Bar = require("../models/Bar");
const Beer = require("../models/Beer");

const beerController = {
  async readAll() {
    //
  },
  async read(req, res) {
    const id = req.params.id;
    const b = await Beer.findByPk(id);
    if (!b) {
      res.status(404).send({ message: "Beer not found" });
    }
    return res.status(200).send(b);
  },
  async create(req, res) {
    //Code à adapter une fois le controller "barController" implémenté
    const barId = req.params.barId;
    const { name, degree, price, description } = req.body;
    const beer = { name, degree, price, description, barId };

    const b = await Beer.create(beer);
    return res.status(201).send({ beer: b, message: "Beer created" });
  },
  async update(req, res) {
    const id = req.params.id;
    const { name, degree, price, description } = req.body;
    const beer = { name, degree, price, description };

    const queryResult = await Beer.update(beer, { where: { id } });
    return res
      .status(200)
      .send({ message: "Beer updated", result: queryResult });
  },
  async delete(req, res) {
    const id = req.params.id;
    const queryResult = await Beer.destroy({ where: { id } });
    if (queryResult === 0) return res.status(404).send("Beer not found");
    return res
      .status(200)
      .send({ message: "Beer deleted", result: queryResult });
  },
};

module.exports = beerController;
