const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Modèle utilisateur
const router = express.Router();

// Inscription
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hachage du mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10); // Utiliser un coût de 10 par exemple
    const user = new User({ username, email, password: hashedPassword }); // Enregistrer le mot de passe haché
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l’inscription', error });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Connexion réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
});

module.exports = router;
