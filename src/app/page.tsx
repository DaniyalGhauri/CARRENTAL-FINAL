'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiClock, FiStar, FiChevronRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/NavBar'
const CarRentalHomepage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const cars = [
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'electric',
      price: '$99/day',
      rating: 4.8,
      image: '/tesla-model3.jpg',
      seats: 5,
      transmission: 'Automatic',
    },
    {
      id: 2,
      name: 'Toyota Camry',
      type: 'sedan',
      price: '$65/day',
      rating: 4.5,
      image: '/toyota-camry.jpg',
      seats: 5,
      transmission: 'Automatic',
    },
    {
      id: 3,
      name: 'Jeep Wrangler',
      type: 'suv',
      price: '$120/day',
      rating: 4.7,
      image: '/jeep-wrangler.jpg',
      seats: 5,
      transmission: 'Manual',
    },
    {
      id: 4,
      name: 'Ford Mustang',
      type: 'sports',
      price: '$150/day',
      rating: 4.9,
      image: '/ford-mustang.jpg',
      seats: 4,
      transmission: 'Automatic',
    },
    {
      id: 5,
      name: 'Honda Civic',
      type: 'sedan',
      price: '$60/day',
      rating: 4.4,
      image: '/honda-civic.jpg',
      seats: 5,
      transmission: 'Automatic',
    },
    {
      id: 6,
      name: 'Chevrolet Tahoe',
      type: 'suv',
      price: '$110/day',
      rating: 4.6,
      image: '/chevrolet-tahoe.jpg',
      seats: 8,
      transmission: 'Automatic',
    },
  ];

  const filteredCars = activeTab === 'all'
    ? cars
    : cars.filter(car => car.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/car-placeholder.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rent the perfect car for your journey
            </h1>
            <p className="text-xl mb-8">
              Discover the best rental deals from our wide selection of vehicles
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer the best car rental services with competitive prices and excellent customer service.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Simple and fast online booking process with instant confirmation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">We guarantee the best prices with no hidden fees.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our customer service is available anytime to assist you.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h4 className="font-semibold">Ahmad Khan</h4>
              <div className="flex items-center text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
            </div>
            <p className="text-gray-600">
              "The booking process was seamless and the car was in excellent condition. Will definitely use DriveEasy again!"
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h4 className="font-semibold">Fatima Noor</h4>
              <div className="flex items-center text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
            </div>
            <p className="text-gray-600">
              "Great selection of vehicles at competitive prices. Customer service was very helpful when I had questions."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h4 className="font-semibold">Yusuf Ali</h4>
              <div className="flex items-center text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
              </div>
            </div>
            <p className="text-gray-600">
              "Renting a car has never been easier. The pickup and drop-off process was quick and convenient."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to hit the road?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have experienced the best car rental service.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
            Book Your Car Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DriveEasy</h3>
              <p className="text-gray-400">
                Your trusted partner for car rentals with the best prices and excellent service.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1234 Rental Street</li>
                <li>San Francisco, CA 94107</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@driveeasy.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CarRentalHomepage;