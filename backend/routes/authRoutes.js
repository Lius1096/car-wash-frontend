const express = require('express');
const { signup, login } = require('../controllers/authcontroller');
const router = express.Router();

// Route pour l'inscription
router.post('/signup', signup);

// Route pour la connexion
router.post('/login', login);

module.exports = router;
