import React from 'react';
import bannerImage from '../assets/images/car-wash-banner.png';

const HomePage = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Car Wash Service</h1>
      <p className="mb-6">Trouvez un laveur à domicile pour votre voiture en quelques clics !</p>
      
      {/* Ajout de l'image ici */}
      <img src={bannerImage} alt="Car Wash Banner" className="w-full h-auto rounded-lg shadow-lg" />

      <div className="mt-10">
        <p className="text-lg">Réservez maintenant pour un lavage professionnel avec des équipements adaptés à l'état de votre véhicule.</p>
      </div>
    </div>
  );
};

export default HomePage;
