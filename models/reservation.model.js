/*
On importe DataTypes depuis le module sequelize 
pour pouvoir définir les types de données des colonnes.
 */

const { DataTypes } = require('sequelize');

/*
Le module exporte une fonction qui prend en argument l'instance sequelize
et utilise sa méthode define pour créer un nouveau modèle appelé Reservation.
*/
module.exports = (sequelize) => {
    const Reservation = sequelize.define('Reservation', {
        number_of_customers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reservation_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reservation_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reservation_note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reservation_status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        /*
            Peut contenir des options supplémentaires pour le modèle,
            telles que:
            des méthodes personnalisées, des configurations d'index, etc...
        */
    });
    return Reservation;
};