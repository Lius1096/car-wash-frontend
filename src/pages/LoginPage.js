import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/connexion.png';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Pour gérer le chargement
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Démarrer le chargement
    console.log('Tentative de connexion en cours...');
    console.log('Email:', email);
    console.log('Mot de passe:', password); // Debugging

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Réponse du serveur:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Connexion réussie, redirection vers le tableau de bord...');
        navigate('/dashboard'); // Rediriger vers le tableau de bord
      } else {
        console.log('Erreur lors de la connexion:', data.message);
        setError(data.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      console.log('Erreur réseau ou serveur:', err);
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false); // Arrêter le chargement
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

        {/* Affichage des erreurs */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Formulaire de connexion */}
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 text-white rounded-md font-semibold transition-colors duration-200 hover:bg-blue-700 ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Lien vers mot de passe oublié */}
        <p className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Mot de passe oublié ?</a>
        </p>

        {/* Lien pour inscription */}
        <p className="mt-4 text-center">
          Pas encore de compte?{' '}
          <a href="/signup" className="text-blue-500 font-semibold hover:underline">
            Inscrivez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
