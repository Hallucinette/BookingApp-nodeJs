// Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'secretkey23456';

// Fichier de routes
const indexRouter = require('./routes/index');

// Implémente l'app qui est une instance d'express
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Implémentation des routes
// app.use('/api', indexRouter); //sans mdp
app.use('/api', verifyJWT, indexRouter)

// Exporte app
module.exports = app;

//
const User = []

const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization');
  
    if(!token) return res.status(401).json({ auth: false, message: 'Veuillez ajouter un token' });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({ auth: false, message: 'Token inccorect.' });
    }
  };