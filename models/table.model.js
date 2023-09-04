const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Table = sequelize.define('Table', {

    }, {});

    return Table;
  };