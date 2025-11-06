import React, { useState } from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon, CheckCircleIcon } from './icons';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="animate-fade-in text-center max-w-lg mx-auto bg-white p-12 rounded-lg shadow-lg">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-700">Your message has been sent successfully. Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Get In Touch</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Please fill out the form below or use our contact details to reach us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 bg-white p-8 rounded-lg shadow-xl">
            {/* Form Section */}
            <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                        <input type="text" id="subject" name="subject" value={formState.subject} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" name="message" value={formState.message} onChange={handleChange} rows={5} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center">
                            {isSubmitting ? (
                                <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                                </>
                            ) : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
            {/* Contact Info Section */}
            <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
                <div className="flex items-start space-x-4">
                    <MailIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"/>
                    <div>
                        <h4 className="font-semibold">Email Us</h4>
                        <p className="text-gray-600">Our team is here to help.</p>
                        <a href="mailto:support@globalstay.com" className="text-blue-600 hover:underline">support@globalstay.com</a>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <PhoneIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"/>
                    <div>
                        <h4 className="font-semibold">Call Us</h4>
                        <p className="text-gray-600">Mon-Fri from 8am to 5pm.</p>
                        <a href="tel:+18001234567" className="text-blue-600 hover:underline">+1 (800) 123-4567</a>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <LocationMarkerIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0"/>
                    <div>
                        <h4 className="font-semibold">Visit Us</h4>
                        <p className="text-gray-600">123 Travel Lane,<br/>Wanderlust City, 12345</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactPage;