
export interface SearchCriteria {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  mainImage: string;
  images: string[];
  amenities: string[];
  description: string;
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
  };
  reviews: Review[];
}

export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
  };
}

export interface ConfirmationDetails {
  bookingId: string;
  hotel: Hotel;
  bookingDetails: BookingDetails;
}
