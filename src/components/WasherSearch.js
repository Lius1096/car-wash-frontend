// src/components/WasherSearch.js
import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import Notification from './Notification';

const WasherSearch = () => {
  const [washers, setWashers] = useState([]);
  const [location, setLocation] = useState('');
  const [selectedWasher, setSelectedWasher] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [equipment, setEquipment] = useState({
    soap: false,
    water: false,
    vacuum: false,
  });

  // Simuler la récupération des laveurs depuis une API
  useEffect(() => {
    const fetchWashers = async () => {
      try {
        const response = await fetch('/api/washers'); // Exemple d'API
        const data = await response.json();
        setWashers(data);
      } catch (error) {
        setNotification({ message: 'Erreur lors du chargement des laveurs.', type: 'error' });
      }
    };

    fetchWashers();
  }, []);

  const handleSearch = () => {
    if (!location) {
      setNotification({ message: 'Veuillez entrer un emplacement.', type: 'error' });
      return;
    }

    // Filtrer les laveurs par emplacement
    const filteredWashers = washers.filter((washer) =>
      washer.location.toLowerCase().includes(location.toLowerCase())
    );

    if (filteredWashers.length > 0) {
      setNotification({ message: 'Recherche réussie, laveurs trouvés !', type: 'success' });
      setWashers(filteredWashers);
    } else {
      setNotification({ message: 'Aucun laveur trouvé pour cet emplacement.', type: 'error' });
    }
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const handleSelectWasher = (washer) => {
    setSelectedWasher(washer);
  };

  const toggleEquipment = (item) => {
    setEquipment((prev) => ({
      ...prev,
      [item]: !prev[item], // Inverser l'état de l'équipement
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recherche de laveurs</h2>
      <input
        type="text"
        placeholder="Entrez votre emplacement"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <button 
        onClick={handleSearch} 
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
        Trouver un laveur
      </button>

      {/* Notification */}
      {notification.message && (
        <Notification message={notification.message} type={notification.type} clearNotification={clearNotification} />
      )}

      {/* Liste des laveurs */}
      <ul className="mt-4">
        {washers.map((washer) => (
          <li 
            key={washer.id} 
            onClick={() => handleSelectWasher(washer)} 
            className="cursor-pointer hover:bg-gray-100 p-2 rounded border border-gray-300 mb-2"
          >
            {washer.name} - {washer.location}
          </li>
        ))}
      </ul>

      {/* Section des équipements */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Choisissez les équipements :</h3>
        <div className="flex flex-wrap mt-2">
          {Object.keys(equipment).map((item) => (
            <button
              key={item}
              onClick={() => toggleEquipment(item)}
              className={`mr-2 mb-2 p-2 rounded transition ${
                equipment[item] ? 'bg-green-500 text-white' : 'bg-gray-200'
              } hover:bg-green-400`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Affichage du formulaire de réservation si un laveur est sélectionné */}
      {selectedWasher && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Laveur sélectionné : {selectedWasher.name}</h3>
          <BookingForm washer={selectedWasher} equipment={equipment} />
        </div>
      )}
    </div>
  );
};

export default WasherSearch;
