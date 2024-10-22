import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FaGoogle, FaFacebookSquare } from 'react-icons/fa';
import backgroundImage from '../assets/images/bg-connect-wah.jpg';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas !");
      return;
    }
   
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l’inscription');
      }

      setMessage(data.message); // Message de succès

      // Réinitialiser les champs après l'inscription réussie
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Rediriger vers la page de connexion après une inscription réussie
      navigate('/login');

    } catch (error) {
      setMessage(error.message);
    }
  };

  const responseGoogle = async (response) => {
    // Gérer la réponse de Google ici
    console.log(response);
    // Envoie la réponse à ton backend pour traitement
    // Utilise fetch pour authentifier l'utilisateur dans ta base de données
  };

  const responseFacebook = async (response) => {
    // Gérer la réponse de Facebook ici
    console.log(response);
    // Envoie la réponse à ton backend pour traitement
    // Utilise fetch pour authentifier l'utilisateur dans ta base de données
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">Ou inscrivez-vous avec</p>

        <div className="mt-4 flex justify-between">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID" // Remplacez par votre ID client Google
            buttonText={
              <span className="flex items-center">
                <FaGoogle className="mr-2" /> Google
              </span>
            }
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="flex items-center justify-center w-full px-4 py-2 bg-red-500 text-white rounded-full mr-2 shadow-md hover:bg-red-600 transition duration-200"
          />
          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID" // Remplacez par votre ID Facebook
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            textButton={
              <span className="flex items-center">
                <FaFacebookSquare className="mr-2" /> Facebook
              </span>
            }
            className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-full ml-2 shadow-md hover:bg-blue-700 transition duration-200"
          />
        </div>

        {/* Message d'erreur ou de succès */}
        {message && <p className={`mt-4 text-sm text-center ${message.includes('Erreur') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        
        {/* Lien vers la connexion si déjà inscrit */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Déjà inscrit ?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Connectez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
