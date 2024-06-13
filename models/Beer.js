const { DataTypes } = require("sequelize")
const db = require("../config/db")
const Bar = require("./Bar");
const {Order} = require("./Order");

//const BeerOrder = require("./BeerOrder");


const Beer = db.define('Beer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },

    degree: {
        type: DataTypes.FLOAT,
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
            min: 0
        },
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

})

Beer.belongsTo(Bar);
Beer.belongsToMany(Order, {
    through: "BeerOrder",
});

module.exports = Beer