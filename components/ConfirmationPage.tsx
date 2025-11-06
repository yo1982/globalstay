
import React from 'react';
import { ConfirmationDetails } from '../types';
import { CheckCircleIcon, EmailIcon } from './icons';

interface ConfirmationPageProps {
  details: ConfirmationDetails;
  onGoHome: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ details, onGoHome }) => {
  const { hotel, bookingDetails, bookingId } = details;
  const checkIn = new Date(); // Using placeholder date for display
  const checkOut = new Date();
  checkOut.setDate(checkIn.getDate() + 3); // Placeholder logic
  const nights = 3;
  const totalCost = hotel.pricePerNight * nights;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-600 mt-2">Your reservation at {hotel.name} is complete.</p>
        
        <div className="my-6 p-4 bg-gray-50 rounded-md border border-gray-200 text-left">
          <p className="text-sm text-gray-500">Booking ID</p>
          <p className="text-lg font-mono font-semibold text-blue-600">{bookingId}</p>
        </div>

        <div className="text-left space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">Your Stay</h2>
            <div className="flex items-start space-x-4">
                <img src={hotel.mainImage} alt={hotel.name} className="w-32 h-24 object-cover rounded-md" />
                <div>
                    <h3 className="font-bold text-lg">{hotel.name}</h3>
                    <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">Check-in:</span> Not Specified</div>
                <div><span className="font-semibold">Check-out:</span> Not Specified</div>
                <div><span className="font-semibold">Guests:</span> Not Specified</div>
                <div><span className="font-semibold">Total Paid:</span> <span className="font-bold">${totalCost.toFixed(2)}</span></div>
            </div>
        </div>

        <div className="mt-6 text-left space-y-2">
            <h2 className="text-xl font-bold border-b pb-2">Guest Information</h2>
            <p className="text-sm"><span className="font-semibold">Name:</span> {bookingDetails.firstName} {bookingDetails.lastName}</p>
            <p className="text-sm"><span className="font-semibold">Email:</span> {bookingDetails.email}</p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg flex items-center justify-center space-x-3">
            <EmailIcon className="w-6 h-6"/>
            <p>A confirmation email has been sent to <strong>{bookingDetails.email}</strong> with your e-receipt.</p>
        </div>

        <button 
            onClick={onGoHome}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
            Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
