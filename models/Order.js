const DataTypes = require("sequelize");
const db = require("../config/db");
const Bar = require("./Bar");

/**
 * @enum {Number}
 */
const OrderStatus = {
    PENDING: 0,
    DONE: 1,
};

const Order = db.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },
    },
    price: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: OrderStatus.PENDING,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
});

Order.belongsTo(Bar);

module.exports = {
    Order,
    OrderStatus,
};