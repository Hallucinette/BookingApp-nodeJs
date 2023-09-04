const db = require('../db.js')
const Reservation = db.reservation;

// Trouver toutes les réservations (findAll):
/*
Cette fonction utilise la méthode findAll de Sequelize
pour récupérer toutes les réservations et les retourne en réponse.
*/
exports.findAll = (req, res) => {
    Reservation.findAll().then(reservations => {
        res.send(reservations)
    })
}

// Créer une nouvelle réservation (create):
exports.create = (req, res) => {
    const {
        number_of_customers,
        reservation_date,
        reservation_name,
        reservation_note
    } = req.body;

    // Validations des données reçues dans req.body.
    if (typeof number_of_customers !== 'number') {
        // Si les validations échouent, une réponse avec un code d'état 422 est envoyée.
        return res.status(422).json({ error: "Le nombre de personne doit être un nombre" });
    }
    if (typeof reservation_date !== 'string') {
        return res.status(422).json({ error: "La date doit être une chaine de caractères" });
    }
    if (typeof reservation_name !== 'string') {
        return res.status(422).json({ error: "Le nom de reservation doit être une chaine de caractères" });
    }
    if (typeof reservation_note !== 'string') {
        return res.status(422).json({ error: "Les notes doivent être une chaine de caractères" });
    }

    // Sinon, une nouvelle réservation est créée avec un statut de réservation de 1.
    Reservation.create({
        number_of_customers: number_of_customers,
        reservation_date: reservation_date,
        reservation_name: reservation_name,
        reservation_note: reservation_note,
        reservation_status: 1,
    }).then(reservation => {
        res.send(reservation)
    });
};

// Mettre à jour une réservation existante (update):
/*
    Cette fonction met à jour une réservation existante en utilisant l'identifiant (id)
    fourni dans les paramètres de la requête (req.params).
    La méthode update de Sequelize est utilisée pour cela.
*/
exports.update = (req, res) => {
    const reservationId = req.params.id
    Reservation.update({
        number_of_customers: req.body.number_of_customers,
        reservation_date: req.body.reservation_date,
        reservation_name: req.body.reservation_name,
        reservation_note: req.body.reservation_note,
        reservation_status: 1,
    }, {
        where: {
            id: reservationId
        }
    }).then(() => {
        res.status(200).send({
            message: `Reservation updated for reservationID: ${reservationId}`
        });
    });
};


// Supprimer une réservation (delete):
/*
    Cette fonction supprime une réservation en utilisant l'identifiant (id) 
    fourni dans les paramètres de la requête.
    La méthode destroy de Sequelize est utilisée pour cela.
*/
exports.delete = (req, res) => {
    const reservationId = req.params.id
    Reservation.destroy({
        where: {
            id: reservationId
        }
    }).then(() => {
        res.status(200).send({
            message: `Reservation deleted for reservationID: ${reservationId}`
        });
    });
};