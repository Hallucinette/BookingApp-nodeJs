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

const { log } = require('console');
const users = [];

// Implémente l'app qui est une instance d'express
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Vérification JWT
const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ auth: false, message: 'Veuillez ajouter un token' });

    // vérifie la validité des tokens JWT.
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        // Si le token est valide, il appelle next() pour passer au prochain middleware ou route
        next();
    } catch (e) {
        // sinon, il retourne une réponse avec un code d'erreur.
        res.status(400).json({ auth: false, message: 'Token inccorect.' });
    }
};

// Sign-in (Connexion)
app.post('/signin', async (req, res) => {
    const user = users.find(u => u.username === req.body.username);
    // TODO: Récupérer l'utilisateur depuis la base de données
    // Vérifie si le mot de passe correspond à celui stocké dans le tableau users

    if (!user) return res.status(400).send("Nom d'utilisateur ou mot de passe incorrect");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Nom d'utilisateur ou mot de passe incorrect");

    const payload = {
        username: user.username,
        // Vous pouvez ajouter d'autres propriétés ici
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
    // génère un token JWT si la connexion est réussie.
    res.json({ message: token });
});

  // Sign-up (Inscription)
 app.post('/signup', async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
        username: req.body.username,
        password: hashedPassword
    };
    users.push(user);

    console.log(users);

    res.status(200).json({ message: "User created" });

});

//sans mdp
//app.use('/api', indexRouter);

// Ajout des Routes et Export
app.use('/api', verifyJWT, indexRouter)
// Exporte app
module.exports = app;