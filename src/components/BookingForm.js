import React, { useState } from 'react';

const BookingForm = () => {
  const [carCondition, setCarCondition] = useState('');
  const [equipmentNeeded, setEquipmentNeeded] = useState([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      carCondition,
      equipmentNeeded,
      location,
      date,
      time,
      message,
    };

    console.log('Détails de la réservation:', bookingDetails);
    // Ici, vous pouvez ajouter la logique pour envoyer ces détails à votre serveur

    // Réinitialiser le formulaire après l'envoi
    resetForm();
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setCarCondition('');
    setEquipmentNeeded([]);
    setLocation('');
    setDate('');
    setTime('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Réservation de lavage</h2>

      <label className="block mb-2">
        État de la voiture :
        <input
          type="text"
          value={carCondition}
          onChange={(e) => setCarCondition(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Équipements nécessaires :
        <select
          multiple
          value={equipmentNeeded}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions).map(option => option.value);
            setEquipmentNeeded(options);
          }}
          className="border rounded p-2 w-full"
          required
        >
          <option value="aspirateur">Aspirateur</option>
          <option value="brosse">Brosse</option>
          <option value="savon">Savon</option>
          <option value="chiffon">Chiffon</option>
        </select>
      </label>

      <label className="block mb-2">
        Lieu :
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Date :
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Heure :
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </label>

      <label className="block mb-2">
        Message :
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Réserver
      </button>
    </form>
  );
};

export default BookingForm;
