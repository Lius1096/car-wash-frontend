import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-800 p-4">
      <div className="container mx-auto">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Car Wash Service</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/find-washer" className="text-white">Trouver un laveur</Link>
          </li>
          <li>
            <Link to="/login" className="text-white">Se connecter</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
