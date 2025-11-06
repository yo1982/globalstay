
import React, { useState } from 'react';
import { Hotel, SearchCriteria, BookingDetails } from '../types';
import { BackIcon, LockIcon } from './icons';

interface BookingPageProps {
  hotel: Hotel;
  searchCriteria: SearchCriteria;
  onConfirmBooking: (details: BookingDetails) => void;
  onBack: () => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ hotel, searchCriteria, onConfirmBooking, onBack }) => {
  const [formState, setFormState] = useState<BookingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formState.firstName) newErrors.firstName = "First name is required.";
    if (!formState.lastName) newErrors.lastName = "Last name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = "A valid email is required.";
    if (!formState.payment.cardHolder) newErrors.cardHolder = "Card holder name is required.";
    if (!/^\d{16}$/.test(formState.payment.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = "A valid 16-digit card number is required.";
    if (!/^\d{2}\/\d{2}$/.test(formState.payment.expiryDate)) newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    if (!/^\d{3,4}$/.test(formState.payment.cvv)) newErrors.cvv = "A valid CVV is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('payment.')) {
        const field = name.split('.')[1];
        setFormState(prev => ({ ...prev, payment: { ...prev.payment, [field]: value } }));
    } else {
        setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()) {
        setIsLoading(true);
        onConfirmBooking(formState);
    }
  };
  
  const checkIn = new Date(searchCriteria.checkInDate);
  const checkOut = new Date(searchCriteria.checkOutDate);
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
  const totalCost = hotel.pricePerNight * nights;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6 font-semibold">
            <BackIcon className="w-5 h-5 mr-2"/>
            Back to Hotel Details
        </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Your Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" name="firstName" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" name="lastName" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                         <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                            <input type="tel" name="phone" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Special Requests (Optional)</label>
                            <textarea name="specialRequests" onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                        </div>
                    </div>
                </div>

                 {/* Payment Details */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Payment Details (Simulation)</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                            <input type="text" name="payment.cardHolder" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Card Number</label>
                            <input type="text" name="payment.cardNumber" placeholder="0000 0000 0000 0000" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input type="text" name="payment.expiryDate" placeholder="MM/YY" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input type="text" name="payment.cvv" placeholder="123" onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>
                 <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                 >
                     {isLoading ? (
                        <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                        </>
                    ) : (
                        <>
                        <LockIcon className="w-5 h-5 mr-2" />
                        Confirm and Pay ${totalCost.toFixed(2)}
                        </>
                    )}
                 </button>
            </form>
        </div>
        <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
                <img src={hotel.mainImage} alt={hotel.name} className="w-full h-40 object-cover rounded-md mb-4"/>
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <p className="text-gray-600">{hotel.city}, {hotel.country}</p>
                <hr className="my-4"/>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Check-in:</span><span className="font-semibold">{searchCriteria.checkInDate}</span></div>
                    <div className="flex justify-between"><span>Check-out:</span><span className="font-semibold">{searchCriteria.checkOutDate}</span></div>
                    <div className="flex justify-between"><span>Guests:</span><span className="font-semibold">{searchCriteria.guests}</span></div>
                    <div className="flex justify-between"><span>Nights:</span><span className="font-semibold">{nights}</span></div>
                </div>
                <hr className="my-4"/>
                <div className="space-y-2">
                    <div className="flex justify-between"><span>{nights} nights x ${hotel.pricePerNight}</span><span>${(hotel.pricePerNight * nights).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Taxes & Fees</span><span>$0.00</span></div>
                </div>
                <hr className="my-4"/>
                <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
