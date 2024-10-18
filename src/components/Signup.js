import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FaGoogle, FaFacebookSquare } from 'react-icons/fa'; // Pour ajouter des icônes
import backgroundImage from '../assets/images/bg-connect-wah.jpg'; // Mettez à jour le chemin selon l'emplacement de votre image

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/signup', { // Mettez à jour cette ligne
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
      // Réinitialiser les champs
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const responseGoogle = (response) => {
    console.log(response); // Gérez la réponse de Google ici
  };

  const responseFacebook = (response) => {
    console.log(response); // Gérez la réponse de Facebook ici
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

        {/* Ajout du texte "Se connecter avec" */}
        <p className="text-center mt-4">Se connecter avec</p>

        {/* Conteneur pour les boutons Google et Facebook */}
        <div className="mt-4 flex justify-between">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID" // Remplacez par votre ID client Google
            buttonText={
              <span className="flex items-center">
                <FaGoogle className="mr-2" /> {/* Icône Google */}
                Google
              </span>
            }
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="w-1/2 mr-2" // Ajuster la largeur et l'espacement
          />
          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID" // Remplacez par votre ID d'application Facebook
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            textButton={
              <span className="flex items-center">
                <FaFacebookSquare className="mr-2" /> {/* Icône Facebook */}
                Facebook
              </span>
            }
            className="w-1/2 ml-2" // Ajuster la largeur et l'espacement
          />
        </div>

        {/* Message d'erreur ou de succès */}
        {message && <p className="mt-4 text-red-600 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
