const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Importer cors ici

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();
app.use(express.json()); // Analyser le JSON des requêtes

// Utiliser le middleware cors
app.use(cors({
  origin: 'http://localhost:3000', // Autoriser les requêtes de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  credentials: true // Activer les informations d'identification (optionnel)
}));

// Routes d'authentification
app.use('/auth', authRoutes); // Utiliser '/auth' pour préfixer toutes les routes dans authRoutes

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
