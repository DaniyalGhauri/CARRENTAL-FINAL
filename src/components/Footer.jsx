import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-green-100 to-green-400 text-black py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">YourLogo</h2>
          <p className="text-sm text-black">
            Helping you grow your business through digital innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/about" className="hover:text-black">About Us</a></li>
            <li><a href="/services" className="hover:text-black">Services</a></li>
            <li><a href="/contact" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/faq" className="hover:text-black">FAQ</a></li>
            <li><a href="/privacy-policy" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-black">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-sm text-black mb-4">
            Get the latest updates right in your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 rounded-l bg-white text-black border border-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-700 border-t border-gray-400 pt-5">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
