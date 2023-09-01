// 1. Importer Sequelize
const {Sequelize, DataTypes} = require('sequelize');

// 2. Implémenter la configuration postgreSQL
const sequelize = new Sequelize('postgres://apprenant11:@127.0.0.1:5432/postgres') // Example for postgres

// 3. Création d'un modèle
const Reservation = sequelize.define('Reservation', {
  // Model attributes are defined here
  number_of_customers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reservation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  reservation_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  reservation_note: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  reservation_status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  // Other model options go here
});

const Spot = sequelize.define('Spot', {

});

const Room = sequelize.define('Room', {

});

const User = sequelize.define('User', {
  user_role: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  user_password:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = {
  Reservation,
  Spot,
  Room,
  User
};
 
// Classe => Référence / abstraction de votre entité
// Object => Instance de votre classe