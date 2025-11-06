import React from 'react';
import { GlobeIcon, TagIcon, ClockIcon } from './icons';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-80 rounded-lg overflow-hidden mb-12">
        <img 
          src="https://picsum.photos/seed/about-hero/1200/400" 
          alt="Diverse group of travelers" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight">
            Connecting the World, One Stay at a Time.
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            At GlobalStay, our mission is to make travel accessible, enjoyable, and unforgettable for everyone. We believe that exploring new places and cultures enriches our lives, and we're dedicated to providing a seamless and reliable platform to help you find the perfect accommodation, wherever your journey takes you.
          </p>
        </section>

        {/* Our Story */}
        <section className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2023 by a group of passionate travelers, GlobalStay was born from a simple idea: booking a hotel should be as exciting as the trip itself. Frustrated with complicated and impersonal booking sites, we set out to create a platform that we would want to use—one that is intuitive, transparent, and packed with helpful features like our AI-powered local guides.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From a small startup, we've grown into a global community of explorers and hosts, but our core values remain the same. We are committed to innovation, customer satisfaction, and a genuine love for travel.
          </p>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <GlobeIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Selection</h3>
              <p className="text-gray-600">From luxury city hotels to cozy countryside inns, we have a vast selection of properties worldwide.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <TagIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We work hard to ensure you get the best possible rates for your stay, with no hidden fees.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <ClockIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is always here to help you, any time of day or night.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;