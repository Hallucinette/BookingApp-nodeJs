// 1. Importer Sequelize
//const {Sequelize, DataTypes} = require('sequelize');

const { Sequelize } = require('sequelize');

// configuration postgreSQL
// const sequelize = new Sequelize('postgres://apprenant11:@127.0.0.1:5432/postgres') // Example for postgres
const sequelize = new Sequelize('postgres://epwkclhi:fbEPb0_rJVV2IZ7dR5ThkJ4gf9jZqAbm@trumpet.db.elephantsql.com/epwkclhi') // Example for postgres

/* Création d'un objet vide db qui va contenir les modèles de la base de données. */
const db = {};

db.user = require('./models/user.model.js')(sequelize);
db.table = require('./models/table.model.js')(sequelize);
db.room = require('./models/room.model.js')(sequelize);
db.reservation = require('./models/reservation.model.js')(sequelize);


// true = force la creation de toutes les tables meme existante
sequelize.sync({ force: true })
  .then(() => {
    console.log("Les tables ont été créées !");
  })
  .catch((error) => {
    console.error("Erreur lors de la création des tables :", error);
  });

// sinon utiliser cette methode ->

// try {
//   sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   })
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// Pour que l'objet db puisse être utilisé dans d'autres parties de l'application
module.exports = db;