const { DataTypes } = require("sequelize")
const db = require("../config/db")


const Bar = db.define('Bar', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    },

    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },
    },

    tel: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

})


module.exports = Bar