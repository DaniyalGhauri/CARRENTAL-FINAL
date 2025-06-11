'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthContext } from '@/lib/authContext';

const Navbar = () => {
  const { user, logout } = useAuthContext(); // make sure `logout` function is provided in context
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  console.log('User:', user);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout(); // adjust if logout is synchronous
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            Car Rental
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-900 hover:text-blue-600 transition">Home</Link>
            <Link href="/cars" className="text-gray-500 hover:text-blue-600 transition">cars</Link>
            <Link href="/bookings" className="text-gray-500 hover:text-blue-600 transition">Bookings</Link>
            <Link href="/services" className="text-gray-500 hover:text-blue-600 transition">Services</Link>
            <Link href="/contact" className="text-gray-500 hover:text-blue-600 transition">Contact</Link>
            {user?.role === 'company' && (
              <Link href="/company-dashboard" className="text-gray-500 hover:text-blue-600 transition">Dashboard</Link>
            )}
            {user?.role === 'admin' && (
              <Link href="/admin-dashboard" className="block text-gray-500 hover:text-blue-600">Dashboard</Link>
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push('/login')}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Register
                </button>
                <button
                  onClick={() => router.push('/company-login')}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Company Login
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-sm">
          <Link href="/" className="block text-gray-900 hover:text-blue-600">Home</Link>
          <Link href="/about" className="block text-gray-500 hover:text-blue-600">About</Link>
          <Link href="/vehicles" className="block text-gray-500 hover:text-blue-600">Vehicles</Link>
          <Link href="/services" className="block text-gray-500 hover:text-blue-600">Services</Link>
          <Link href="/contact" className="block text-gray-500 hover:text-blue-600">Contact</Link>
          {user?.role === 'company' && (
            <Link href="/company-dashboard" className="block text-gray-500 hover:text-blue-600">Dashboard</Link>
          )}
          {user?.role === 'admin' && (
            <Link href="/admin-dashboard" className="block text-gray-500 hover:text-blue-600">Dashboard</Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-600 hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push('/login')}
                className="w-full text-left text-gray-600 hover:text-blue-600"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Register
              </button>
              <button
                onClick={() => router.push('/company-login')}
                className="w-full text-left text-gray-600 hover:text-blue-600"
              >
                Company Login
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;