"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { Car, Booking, RentalCompany, User } from '@/types';

export default function AdminDashboard() {
    const router = useRouter();
    const [companies, setCompanies] = useState<RentalCompany[]>([]);
    const [customers, setCustomers] = useState<User[]>([]);
    const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    router.push('/login');
                    return;
                }

                // Verify admin role
                const userDoc = await getDocs(query(collection(db, 'users'), where('id', '==', user.uid)));
                if (userDoc.empty || userDoc.docs[0].data().role !== 'admin') {
                    router.push('/');
                    return;
                }

                // Load companies
                const companiesQuery = query(collection(db, 'companies'));
                const companiesSnapshot = await getDocs(companiesQuery);
                const companiesData = companiesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as RentalCompany[];
                setCompanies(companiesData);

                // Load customers
                const customersQuery = query(
                    collection(db, 'users'),
                    where('role', '==', 'customer')
                );
                const customersSnapshot = await getDocs(customersQuery);
                const customersData = customersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as User[];
                setCustomers(customersData);

                // Load recent bookings
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    orderBy('createdAt', 'desc'),
                    limit(10)
                );
                const bookingsSnapshot = await getDocs(bookingsQuery);
                const bookingsData = bookingsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        startDate: new Date(data.startDate.seconds * 1000),
                        endDate: new Date(data.endDate.seconds * 1000),
                        createdAt: new Date(data.createdAt.seconds * 1000)
                    } as Booking;
                });
                setRecentBookings(bookingsData);

            } catch (err) {
                console.error('Error loading dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [router]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Total Companies</h3>
                        <p className="text-3xl font-bold text-blue-600">{companies.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Total Customers</h3>
                        <p className="text-3xl font-bold text-green-600">{customers.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                        <p className="text-3xl font-bold text-purple-600">{recentBookings.length}</p>
                    </div>
                </div>

                {/* Companies Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Companies</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {companies.map((company) => (
                                    <tr key={company.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{company.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{company.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${company.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                            >
                                                {company.isVerified ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{company.rating.toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Bookings Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.carId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                                ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">${booking.totalCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 