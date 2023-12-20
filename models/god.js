const sequelize = require('../database/databaseSequelize');
const { DataTypes } = require('sequelize');

const God = sequelize.define('god', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue("name")
        },
        set(newValue){
            this.setDataValue('name', newValue)
        }
    },
},{
    sequelize,
    freezeTableName: true
})

module.exports = God;