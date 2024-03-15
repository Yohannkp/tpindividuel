const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db");
const Todolist = require('../todolist');


const Tache = sequelize.define('Tache', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    todolistid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Todolist,
            key: 'id'
        }
    }

}, {timestamps: true})

Tache.belongsTo(Todolist, {
    foreignKey: 'todolistid',
    as: 'tache_belongsTo_todolist',
    // The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL
    // onDelete: "RESTRICT",  Default is SET NULL
    // onUpdate: "RESTRICT",     Default is CASCADE
})

Todolist.hasMany(Tache, {
    foreignKey: 'todolistid',
    as: 'tache_has_one_todolist'
})

// User.sync({ force: true })

// update User table if exist without delete
// await User.sync({ alter: true });
// drop and create User table
// await User.sync({ force: true });
// create User table if not exist
module.exports = Tache
