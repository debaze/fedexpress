const Bar = require("../models/Bar");
const { Order, OrderStatus } = require("../models/Order");

const { Op } = require("sequelize");

const orderController = {
  async read(request, response) {
    const orderId = request.params.orderId;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return response.status(404).json({
        message: "No order found with the given ID.",
      });
    }

    return response.status(200).json(order);
  },
  async readByBar(request, response) {
    const barId = request.params.barId;
    const bar = await Bar.findByPk(barId);

    if (!bar) {
      return response.status(404).json({
        message: "No bar found with the given ID.",
      });
    }

    if ("date" in request.query) {
      return await orderController.readOrdersByDate(request, response);
    }
    if ("min_price" in request.query || "max_price" in request.query) {
      return await orderController.readOrdersBetweenPrice(request, response);
    }

    const orders = await Order.findAll({
      where: {
        BarId: barId,
      },
    });

    return response.status(200).json(orders);
  },
  async readOrdersByDate(req, res) {
    const requestDate = req.query.date;
    const barId = req.params.barId;

    const bar = await Bar.findByPk(barId);
    if (!bar) {
      return res.status(400).send({ message: "Invalid barId" });
    }

    const [day, month, year] = requestDate.split("-");
    const formattedDate = new Date(year, month - 1, day);

    if (isNaN(formattedDate.getTime())) {
      return res.status(400).send({ message: "Invalid date format" });
    }

    const orders = await Order.findAll({
      where: { BarId: barId, date: requestDate },
    });
    return res.status(200).send(orders);
  },
  async readOrdersBetweenPrice(req, res) {
    const minPrice = req.query.min_price;
    const maxPrice = req.query.max_price;
    const barId = req.params.barId;

    const bar = await Bar.findByPk(barId);
    if (!bar) {
      return res.status(400).send({ message: "Invalid barId" });
    }

    if (!minPrice || !maxPrice || minPrice < 0 || maxPrice < 0) {
      return res
        .status(400)
        .send({ message: "One or several invalid parameters" });
    }
    if (minPrice > maxPrice) {
      return res
        .status(400)
        .send({ message: "Minimal price is over maximal price" });
    }

    const orders = await Order.findAll({
      where: {
        BarId: barId,
        price: {
          [Op.between]: [minPrice, maxPrice],
        },
      },
    });
    return res.status(200).send(orders);
  },
  async create(request, response) {
    if (!request.form.isValid) {
      return response.status(400).json({
        message: "Invalid form.",
      });
    }

    const barId = request.params.barId;
    const bar = await Bar.findByPk(barId);

    if (!bar) {
      return response.status(400).json({
        message: "Invalid form: No bar found with the given ID.",
      });
    }

    request.form.status = OrderStatus.PENDING;
    request.form.BarId = barId;

    const order = await Order.create(request.form);

    return response.status(201).json({
      order,
      message: "The order has been created.",
    });
  },
  async update(request, response) {
    if (!request.form.isValid) {
      return response.status(400).json({
        message: "Invalid form.",
      });
    }

    const barId = request.form.BarId;
    const bar = await Bar.findByPk(barId);

    if (!bar) {
      return response.status(400).json({
        message: "Invalid form: No bar found with the given ID.",
      });
    }

    const orderId = request.params.orderId;
    const isUpdated = await Order.update(request.form, {
      where: {
        id: orderId,
      },
    });

    if (!isUpdated) {
      return response.status(404).json({
        message: "No order found with the given ID.",
      });
    }

    const order = await Order.findByPk(orderId);

    return response.status(200).json({
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
      return response.status(404).json({
        message: "No order found with the given ID.",
      });
    }

    return response.status(200).json({
      message: "The order has been deleted.",
    });
  },
};

module.exports = orderController;
