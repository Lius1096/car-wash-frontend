// src/components/WasherProfile.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const WasherProfile = ({ washer }) => {
  const history = useHistory();

  const handleBookWasher = () => {
    // Rediriger vers la page de réservation en passant les détails du laveur
    history.push({
      pathname: '/booking',
      state: { washer }
    });
  };

  return (
    <div className="p-4 border rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profil du laveur : {washer.name}</h2>

      <div className="mb-4">
        <p><strong>Emplacement :</strong> {washer.location}</p>
        <p><strong>Années d'expérience :</strong> {washer.experience} ans</p>
        <p><strong>Services :</strong> {washer.services.join(', ')}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Avis :</h3>
        {washer.reviews && washer.reviews.length > 0 ? (
          <ul className="list-disc list-inside">
            {washer.reviews.map((review, index) => (
              <li key={index} className="mb-2">
                <p className="font-semibold">{review.author} :</p>
                <p className="italic">"{review.comment}"</p>
                <p className="text-yellow-500">Note : {review.rating}/5</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun avis pour le moment.</p>
        )}
      </div>

      <button
        onClick={handleBookWasher}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition w-full"
      >
        Réserver {washer.name}
      </button>
    </div>
  );
};

export default WasherProfile;
