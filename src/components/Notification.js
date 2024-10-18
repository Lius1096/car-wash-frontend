import React, { useEffect } from 'react';

// Notification Component
const Notification = ({ message, type, clearNotification }) => {

  useEffect(() => {
    // Effacer la notification après 5 secondes
    const timer = setTimeout(() => {
      clearNotification();
    }, 5000);

    // Nettoyage du timer lors du démontage
    return () => clearTimeout(timer);
  }, [clearNotification]);

  // Couleurs de la notification selon le type (succès, erreur, info)
  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border border-gray-400 text-gray-700';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${getNotificationStyle()} mt-4`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
