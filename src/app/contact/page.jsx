'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Have questions? Reach out to us via the form below, email us at{" "}
          <a href="mailto:info@carrental.com" className="text-indigo-600 underline">
            info@carrental.com
          </a>,<br /> or call <span className="font-semibold">(123) 456-7890</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-gray-50 border rounded-lg p-2.5 shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-gray-50 border rounded-lg p-2.5 shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full bg-gray-50 border rounded-lg p-2.5 shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Type your message here..."
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2.5 rounded-lg shadow-md hover:bg-indigo-600 focus:ring focus:ring-indigo-300 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
