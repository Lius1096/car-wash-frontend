const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modèle utilisateur
const router = express.Router();

/// Inscription
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      // Enregistrer le nouvel utilisateur sans hachage manuel
      const user = new User({ username, email, password }); // Utiliser le mot de passe en clair
      await user.save();
  
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error(error); // Log l'erreur pour le débogage
      res.status(500).json({ message: 'Erreur lors de l’inscription', error: error.message });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Tentative de connexion avec:', { email, password }); // Log pour déboguer
  
    try {
      // Vérification de l'email dans la base de données
      const user = await User.findOne({ email });
      if (!user) {
        console.log('Utilisateur non trouvé pour cet email:', email);
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Comparaison des mots de passe en utilisant la méthode comparePassword
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          console.log('Mot de passe incorrect pour l\'utilisateur:', email);
          return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      // Génération du token JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: '1h',
      });

      console.log('Token généré avec succès pour:', email);
      return res.json({ token, message: 'Connexion réussie' });
  } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});
  
module.exports = router;
