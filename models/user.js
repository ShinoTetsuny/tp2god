const sequelize = require('../database/databaseSequelize');
const { DataTypes } = require('sequelize');
const Role = require('./role');
const God = require('./god');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        get(){
            return this.getDataValue("name")
        },
        set(newValue){
            this.setDataValue('name', newValue)
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    freezeTableName: true
})

//roleId
User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' })

//godId
User.belongsTo(God, { foreignKey: 'godId' });
God.hasMany(User, {foreignKey: 'godId'})

module.exports = User;
