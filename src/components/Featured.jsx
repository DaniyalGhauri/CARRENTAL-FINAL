"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  { id: 1, title: 'Web Design', image: '/UI.webp' },
  { id: 2, title: 'Web Development', image: '/WebDevelopment.webp' },
  { id: 3, title: 'Digital Marketing', image: '/digitalmarketing.webp' },
  { id: 4, title: 'App Development', image: '/mobileappdevelopment.webp' },
  { id: 5, title: 'Content Creation', image: '/images/content.jpg' },
  { id: 6, title: 'Social Media', image: '/images/social.jpg' },
  { id: 7, title: 'Ecommerce Solutions', image: '/images/ecommerce.jpg' },
  { id: 8, title: 'Brand Strategy', image: '/images/brand.jpg' },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60, rotate: -5 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 12,
    },
  },
};

const Featured = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-green-100 to-green-200 min-h-screen p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row gap-10 items-center max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="lg:w-1/2">
           <h1 className='text-2xl mb-4 font-bold text-green-600'>Our Services</h1>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Featured Services</h1>
          <p className="text-lg text-gray-700">
            We provide a wide range of digital solutions that help businesses succeed in today’s competitive environment. Here are our top services:
          </p>
        </div>

        {/* Card Columns with Animation */}
        <motion.div
          className="lg:w-1/2 flex gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }} // Animate every time in view
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-4 mt-0 sm:mt-10">
            <Card service={services[0]} />
            <Card service={services[1]} />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 mt-6 sm:mt-20">
            <Card service={services[2]} />
            <Card service={services[3]} />
            <Card service={services[4]} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 mt-12 sm:mt-32">
            <Card service={services[5]} />
            <Card service={services[6]} />
            <Card service={services[7]} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ service }) => (
  <motion.div
    className="relative h-40 w-full rounded-xl overflow-hidden shadow-md group"
    variants={cardVariant}
    whileHover={{ scale: 1.05, rotate: 1 }}
    viewport={{ once: false }}
  >
    <img
      src={service.image}
      alt={service.title}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h3 className="text-white text-lg font-semibold text-center px-2">{service.title}</h3>
    </div>
  </motion.div>
);

export default Featured;
