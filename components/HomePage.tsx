
import React, { useState } from 'react';
import { SearchCriteria } from '../types';
import { SearchIcon, CalendarIcon, UserIcon } from './icons';

interface HomePageProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !checkInDate || !checkOutDate) {
      alert('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    onSearch({ city, checkInDate, checkOutDate, guests });
  };

  return (
    <div className="relative -mt-8">
      <div className="h-[500px] bg-cover bg-center rounded-lg shadow-xl" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1600/500')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Find your perfect stay</h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">Search deals on hotels, homes, and much more...</p>
        </div>
      </div>

      <div className="relative -mt-16 sm:-mt-12 mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 items-center">
          
          <div className="md:col-span-4 lg:col-span-3 relative">
            <label htmlFor="city" className="sr-only">City</label>
            <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Paris, Tokyo, New York"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 relative">
             <label htmlFor="checkin" className="sr-only">Check-in</label>
             <CalendarIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="checkin"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-2 relative">
             <label htmlFor="checkout" className="sr-only">Check-out</label>
             <CalendarIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="checkout"
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-1 relative">
             <label htmlFor="guests" className="sr-only">Guests</label>
             <UserIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="guests"
              type="number"
              value={guests}
              min="1"
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="md:col-span-4 lg:col-span-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition w-full disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
                <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
                </>
            ) : 'Search'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
