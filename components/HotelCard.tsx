
import React from 'react';
import { Hotel } from '../types';
import { StarIcon } from './icons';

interface HotelCardProps {
  hotel: Hotel;
  onSelectHotel: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelectHotel }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
      onClick={() => onSelectHotel(hotel)}
    >
      <div className="relative">
        <img src={hotel.mainImage} alt={hotel.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
          <StarIcon className="w-4 h-4" />
          <span>{hotel.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">{hotel.name}</h3>
        <p className="text-gray-600 text-sm">{hotel.city}, {hotel.country}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">${hotel.pricePerNight}</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md group-hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
