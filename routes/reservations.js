// Importation des dépendances et du contrôleur:

const reservationController = require('../controllers/reservation.controller.js');
var express = require('express');

// Création d'un routeur Express:

var router = express.Router();

router.get('/reservations', reservationController.findAll);

router.post('/reservations', reservationController.create);

router.put('/reservations/:id', reservationController.update);

router.delete('/reservations/:id', reservationController.delete);

module.exports = router;