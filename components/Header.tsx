import React from 'react';
import { BuildingIcon } from './icons';

interface HeaderProps {
    onGoHome: () => void;
    onGoToDestinations: () => void;
    onGoToAbout: () => void;
    onGoToContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, onGoToDestinations, onGoToAbout, onGoToContact }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={onGoHome}
        >
          <BuildingIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">GlobalStay</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" onClick={(e) => { e.preventDefault(); onGoHome(); }} className="text-gray-600 hover:text-blue-600 transition-colors hidden md:block">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onGoToDestinations(); }} className="text-gray-600 hover:text-blue-600 transition-colors hidden md:block">Destinations</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onGoToAbout(); }} className="text-gray-600 hover:text-blue-600 transition-colors hidden md:block">About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onGoToContact(); }} className="text-gray-600 hover:text-blue-600 transition-colors hidden md:block">Contact Us</a>
          <button className="border border-gray-300 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;