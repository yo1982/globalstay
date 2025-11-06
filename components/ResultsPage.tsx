
import React from 'react';
import { Hotel, SearchCriteria } from '../types';
import HotelCard from './HotelCard';

interface ResultsPageProps {
  hotels: Hotel[];
  searchCriteria: SearchCriteria | null;
  onSelectHotel: (hotel: Hotel) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ hotels, searchCriteria, onSelectHotel }) => {
  if (hotels.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No Hotels Found</h2>
        <p className="text-gray-600">We couldn't find any hotels matching your search for "{searchCriteria?.city}".</p>
        <p className="text-gray-600">Please try a different city or adjust your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Results for "{searchCriteria?.city}"</h1>
      <p className="text-gray-600 mb-6">{hotels.length} properties found</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} onSelectHotel={onSelectHotel} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
