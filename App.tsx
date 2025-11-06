import React, { useState } from 'react';
import { Hotel, SearchCriteria, BookingDetails, ConfirmationDetails } from './types';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import DetailsPage from './components/DetailsPage';
import BookingPage from './components/BookingPage';
import ConfirmationPage from './components/ConfirmationPage';
import Header from './components/Header';
import DestinationsPage from './components/DestinationsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import { MOCK_HOTELS } from './constants';

export enum Page {
  HOME,
  RESULTS,
  DETAILS,
  BOOKING,
  CONFIRMATION,
  DESTINATIONS,
  ABOUT,
  CONTACT,
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [confirmationDetails, setConfirmationDetails] = useState<ConfirmationDetails | null>(null);

  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    // Simulate API call
    setTimeout(() => {
      const filteredHotels = MOCK_HOTELS.filter(hotel => 
        hotel.city.toLowerCase().includes(criteria.city.toLowerCase())
      );
      setHotels(filteredHotels);
      setCurrentPage(Page.RESULTS);
    }, 1000);
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setCurrentPage(Page.DETAILS);
  };

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setCurrentPage(Page.BOOKING);
  };

  const handleConfirmBooking = (details: BookingDetails) => {
    setBookingDetails(details);
    // Simulate booking and payment processing
    setTimeout(() => {
      setConfirmationDetails({
        bookingId: `GS${Math.floor(Math.random() * 900000) + 100000}`,
        hotel: selectedHotel!,
        bookingDetails: details,
      });
      setCurrentPage(Page.CONFIRMATION);
    }, 2000);
  };

  const handleGoHome = () => {
    setCurrentPage(Page.HOME);
    setSearchCriteria(null);
    setHotels([]);
    setSelectedHotel(null);
    setBookingDetails(null);
    setConfirmationDetails(null);
  };
  
  const handleGoToDestinations = () => {
    setCurrentPage(Page.DESTINATIONS);
  };

  const handleGoToAbout = () => {
    setCurrentPage(Page.ABOUT);
  };

  const handleGoToContact = () => {
    setCurrentPage(Page.CONTACT);
  };

  const handleGoBackToResults = () => {
    setCurrentPage(Page.RESULTS);
    setSelectedHotel(null);
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage onSearch={handleSearch} />;
      case Page.RESULTS:
        return <ResultsPage hotels={hotels} onSelectHotel={handleSelectHotel} searchCriteria={searchCriteria} />;
      case Page.DETAILS:
        if (selectedHotel) {
          return <DetailsPage hotel={selectedHotel} onBookNow={handleBookNow} onBack={handleGoBackToResults} />;
        }
        return <HomePage onSearch={handleSearch} />;
      case Page.BOOKING:
        if (selectedHotel && searchCriteria) {
          return <BookingPage hotel={selectedHotel} searchCriteria={searchCriteria} onConfirmBooking={handleConfirmBooking} onBack={() => setCurrentPage(Page.DETAILS)} />;
        }
        return <HomePage onSearch={handleSearch} />;
      case Page.CONFIRMATION:
        if (confirmationDetails) {
          return <ConfirmationPage details={confirmationDetails} onGoHome={handleGoHome} />;
        }
        return <HomePage onSearch={handleSearch} />;
      case Page.DESTINATIONS:
        return <DestinationsPage onSearch={handleSearch} />;
      case Page.ABOUT:
        return <AboutPage />;
      case Page.CONTACT:
        return <ContactPage />;
      default:
        return <HomePage onSearch={handleSearch} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header 
        onGoHome={handleGoHome} 
        onGoToDestinations={handleGoToDestinations} 
        onGoToAbout={handleGoToAbout}
        onGoToContact={handleGoToContact}
      />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;