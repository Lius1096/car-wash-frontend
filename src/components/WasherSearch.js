// src/components/WasherSearch.js
import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm'; // Ajustez le chemin si nécessaire

const WasherSearch = () => {
  const [washers, setWashers] = useState([]);
  const [location, setLocation] = useState('');
  const [selectedWasher, setSelectedWasher] = useState(null);

  // Simuler la récupération des laveurs depuis une API
  useEffect(() => {
    // Remplacez ceci par un appel API réel
    const fetchWashers = async () => {
      const response = await fetch('/api/washers'); // Exemple d'API
      const data = await response.json();
      setWashers(data);
    };

    fetchWashers();
  }, []);

  const handleSearch = () => {
    // Logique pour filtrer les laveurs par emplacement
    // Pour l'exemple, tous les laveurs sont affichés
  };

  const handleSelectWasher = (washer) => {
    setSelectedWasher(washer);
  };

  return (
    <div>
      <h2>Recherche de laveurs</h2>
      <input
        type="text"
        placeholder="Entrez votre emplacement"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Trouver un laveur</button>
      
      <ul>
        {washers.map((washer) => (
          <li key={washer.id} onClick={() => handleSelectWasher(washer)}>
            {washer.name} - {washer.location}
          </li>
        ))}
      </ul>

      {selectedWasher && (
        <div>
          <h3>Laveur sélectionné : {selectedWasher.name}</h3>
          <BookingForm washer={selectedWasher} />
        </div>
      )}
    </div>
  );
};

export default WasherSearch;
