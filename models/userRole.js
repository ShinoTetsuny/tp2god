const { DataTypes } = require('sequelize');
const sequelize = require('../database/databaseSequelize');

const UserRole = sequelize.define('userrole', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, {
  sequelize,
  freezeTableName: true,
  timestamps: true,
  underscored: true,
  modelName: 'userrole',
});

module.exports = UserRole;
