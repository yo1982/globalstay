
import React, { useState, useEffect } from 'react';
import { Hotel } from '../types';
import { generateLocalGuide } from '../services/geminiService';
import { StarIcon, WifiIcon, PoolIcon, RestaurantIcon, GymIcon, BackIcon, SparklesIcon } from './icons';
import ReactMarkdown from 'react-markdown';


interface DetailsPageProps {
  hotel: Hotel;
  onBookNow: (hotel: Hotel) => void;
  onBack: () => void;
}

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    switch (amenity.toLowerCase()) {
        case 'free wifi': return <WifiIcon className="w-5 h-5 mr-2 text-blue-600"/>;
        case 'pool': return <PoolIcon className="w-5 h-5 mr-2 text-blue-600"/>;
        case 'restaurant': return <RestaurantIcon className="w-5 h-5 mr-2 text-blue-600"/>;
        case 'gym': return <GymIcon className="w-5 h-5 mr-2 text-blue-600"/>;
        default: return <span className="mr-2 text-blue-600">•</span>;
    }
};

const DetailsPage: React.FC<DetailsPageProps> = ({ hotel, onBookNow, onBack }) => {
  const [localGuide, setLocalGuide] = useState('');
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);

  const fetchLocalGuide = () => {
    setIsLoadingGuide(true);
    generateLocalGuide(hotel.name, hotel.city)
      .then(guide => setLocalGuide(guide))
      .catch(error => console.error(error))
      .finally(() => setIsLoadingGuide(false));
  };
  
  return (
    <div className="animate-fade-in">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6 font-semibold">
            <BackIcon className="w-5 h-5 mr-2"/>
            Back to Results
        </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{hotel.name}</h1>
                <p className="text-md text-gray-600 mb-4">{hotel.city}, {hotel.country}</p>
                <div className="flex items-center mb-6">
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-6 h-6 ${i < Math.round(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="ml-3 text-lg font-bold text-gray-800">{hotel.rating}</span>
                    <span className="ml-2 text-gray-600">({hotel.reviewsCount} reviews)</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>
                <div className="text-right">
                    <span className="text-3xl font-bold text-gray-900">${hotel.pricePerNight}</span>
                    <span className="text-gray-600">/night</span>
                </div>
                <button 
                    onClick={() => onBookNow(hotel)}
                    className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                >
                    Book Now
                </button>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 p-2">
                {hotel.images.slice(0, 4).map((img, index) => (
                     <img key={index} src={img} alt={`${hotel.name} view ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                ))}
            </div>
        </div>
        
        <div className="p-6 md:p-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {hotel.amenities.map(amenity => (
                        <li key={amenity} className="flex items-center text-gray-700"><AmenityIcon amenity={amenity} /> {amenity}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Hotel Policies</h2>
                <ul className="space-y-2">
                    <li className="text-gray-700"><strong>Check-in:</strong> {hotel.policies.checkIn}</li>
                    <li className="text-gray-700"><strong>Check-out:</strong> {hotel.policies.checkOut}</li>
                    <li className="text-gray-700"><strong>Cancellation:</strong> {hotel.policies.cancellation}</li>
                </ul>
            </div>
        </div>

        <div className="p-6 md:p-8 border-t border-gray-200">
             <h2 className="text-2xl font-bold mb-4">AI-Powered Local Guide</h2>
             {!localGuide && !isLoadingGuide && (
                 <button 
                     onClick={fetchLocalGuide}
                     className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center"
                 >
                     <SparklesIcon className="w-5 h-5 mr-2" />
                     Generate Guide
                 </button>
             )}
             {isLoadingGuide && (
                 <div className="flex items-center text-gray-600">
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Generating your personalized local guide...
                 </div>
             )}
            {localGuide && (
                <div className="prose prose-blue max-w-none bg-gray-50 p-4 rounded-md">
                   <ReactMarkdown>{localGuide}</ReactMarkdown>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default DetailsPage;
