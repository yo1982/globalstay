import React from 'react';
import { SearchCriteria } from '../types';

interface DestinationsPageProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const popularDestinations = [
  { name: 'Paris', country: 'France', image: 'https://picsum.photos/seed/paris-dest/800/600' },
  { name: 'Tokyo', country: 'Japan', image: 'https://picsum.photos/seed/tokyo-dest/800/600' },
  { name: 'New York', country: 'USA', image: 'https://picsum.photos/seed/newyork-dest/800/600' },
  { name: 'Rome', country: 'Italy', image: 'https://picsum.photos/seed/rome-dest/800/600' },
];

const DestinationsPage: React.FC<DestinationsPageProps> = ({ onSearch }) => {
  const handleDestinationSelect = (city: string) => {
    // Create default dates for the search to make it seamless for the user
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 8); // 7 nights stay

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const criteria: SearchCriteria = {
      city: city,
      checkInDate: formatDate(tomorrow),
      checkOutDate: formatDate(nextWeek),
      guests: 2,
    };
    onSearch(criteria);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore Popular Destinations</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Get inspired for your next trip. Click on a city to discover top-rated hotels.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularDestinations.map((dest) => (
          <div
            key={dest.name}
            onClick={() => handleDestinationSelect(dest.name)}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
          >
            <img src={dest.image} alt={dest.name} className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
              <p className="text-gray-200">{dest.country}</p>
            </div>
            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
