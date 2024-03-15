const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    TacheModel = require('../tache')

const Todolist = sequelize.define('todolist', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    idUser: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    
    
}, {timestamps: true})




//Product.sync({ force: true })
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = Todolist
