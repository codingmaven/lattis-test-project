const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const User = require('./User');

const tableName = 'locks';

const Lock = sequelize.define('Lock', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  macId: {
    type: Sequelize.DataTypes.UUID,
    default: Sequelize.DataTypes.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

Lock.belongsTo(User, { foreignKey: 'fk_user', targetKey: 'userId' });

// eslint-disable-next-line
Lock.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Lock;
