const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Rôle peut être 'user' ou 'admin'
});

// Hachage du mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
  // Vérifie si le mot de passe a été modifié avant de procéder au hachage
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10); // Génération d'un sel pour le hachage
    this.password = await bcrypt.hash(this.password, salt); // Hachage du mot de passe
    next(); // Continue le processus de sauvegarde si tout se passe bien
  } catch (err) {
    next(err); // Passe l'erreur à la chaîne de middleware en cas d'échec
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare le mot de passe en clair avec le haché
  } catch (err) {
    throw new Error(err); // Gère les erreurs en cas d'échec de comparaison
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;

