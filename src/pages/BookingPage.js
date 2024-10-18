// src/components/BookingPage.js
import React, { useState } from 'react';
import Notification from './Notification';

const BookingPage = ({ washer, equipment }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  const [date, setDate] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date || !userData.firstName || !userData.lastName || !userData.phoneNumber || !userData.email) {
      setNotification({ message: 'Veuillez remplir tous les champs.', type: 'error' });
      return;
    }

    try {
      const bookingDetails = {
        washerId: washer.id,
        washerName: washer.name,
        date,
        equipment,
        user: userData,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        setNotification({ message: 'Réservation réussie!', type: 'success' });
      } else {
        setNotification({ message: 'Échec de la réservation. Veuillez réessayer.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Erreur lors de la réservation.', type: 'error' });
    }
  };

  const clearNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Réserver un lavage avec {washer.name}</h2>
      
      <form onSubmit={handleBooking}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date de réservation</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Équipements sélectionnés :</h3>
          <ul className="mt-2">
            {Object.keys(equipment).map((item) => (
              equipment[item] && (
                <li key={item} className="text-green-600">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              )
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Confirmer la réservation
        </button>
      </form>

      {notification.message && (
        <Notification message={notification.message} type={notification.type} clearNotification={clearNotification} />
      )}
    </div>
  );
};

export default BookingPage;
