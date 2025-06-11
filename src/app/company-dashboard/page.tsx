"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Car, Booking, RentalCompany } from '@/types';

export default function CompanyDashboard() {
    const router = useRouter();
    const [cars, setCars] = useState<Car[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [companyDetails, setCompanyDetails] = useState<RentalCompany | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    router.push('/company-registration');
                    return;
                }

                // Load company details
                const companyQuery = query(
                    collection(db, 'companies'),
                    where('email', '==', user.email)
                );
                const companySnapshot = await getDocs(companyQuery);
                if (!companySnapshot.empty) {
                    const companyData = {
                        id: companySnapshot.docs[0].id,
                        ...companySnapshot.docs[0].data()
                    } as RentalCompany;
                    setCompanyDetails(companyData);
                }

                // Load cars
                const carsQuery = query(
                    collection(db, 'cars'),
                    where('companyId', '==', user.uid)
                );
                const carsSnapshot = await getDocs(carsQuery);
                const carsData = carsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Car[];
                setCars(carsData);

                // Load bookings
                const bookingsQuery = query(
                    collection(db, 'bookings'),
                    where('companyId', '==', user.uid)
                );
                
                const bookingsSnapshot = await getDocs(bookingsQuery);
                const bookingsData = bookingsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        carId: data.carId,
                        userId: data.userId,
                        companyId: data.companyId,
                        startDate: new Date(data.startDate.seconds * 1000),
                        endDate: new Date(data.endDate.seconds * 1000),
                        totalCost: data.totalCost,
                        status: data.status,
                        paymentStatus: data.paymentStatus,
                        createdAt: new Date(data.createdAt.seconds * 1000)
                    } as Booking;
                });
                setBookings(bookingsData);

            } catch (err) {
                console.error('Error loading dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [router]);

    const handleToggleAvailability = async (carId: string, currentStatus: boolean) => {
        try {
            const carRef = doc(db, 'cars', carId);
            await updateDoc(carRef, {
                isAvailable: !currentStatus
            });

            // Update local state
            setCars(cars.map(car => 
                car.id === carId
                    ? { ...car, isAvailable: !currentStatus }
                    : car
            ));
        } catch (err) {
            console.error('Error updating car availability:', err);
            setError('Failed to update car availability');
        }
    };

    const handleUpdateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
        try {
            const bookingRef = doc(db, 'bookings', bookingId);
            await updateDoc(bookingRef, {
                status: newStatus
            });

            // Update local state
            setBookings(bookings.map(booking => 
                booking.id === bookingId
                    ? { ...booking, status: newStatus }
                    : booking
            ));
        } catch (err) {
            console.error('Error updating booking status:', err);
            setError('Failed to update booking status');
        }
    };

    const formatDate = (dateString: string | Date) => {
        try {
            // Handle both string and Date objects
            const date = typeof dateString === 'string' 
                ? new Date(dateString.replace(' at ', 'T').replace(' UTC+5', '+05:00'))
                : new Date(dateString);

            if (isNaN(date.getTime())) {
                return 'Invalid Date';
            }

            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (err) {
            console.error('Error formatting date:', err);
            return 'Invalid Date';
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    const calculateTotalEarnings = () => {
        return bookings
            .filter(b => b.status === 'completed')
            .reduce((total, booking) => total + booking.totalCost, 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {companyDetails?.name || 'Company Dashboard'}
                            </h1>
                            <p className="text-gray-600">
                                Total Earnings: ${calculateTotalEarnings().toFixed(2)}
                            </p>
                        </div>
                        <Link
                            href="/company-dashboard/add-car"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add New Car
                        </Link>
                    </div>
                </div>

                {/* Cars Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <div key={car.id} className="border rounded-lg p-4">
                                {car.images[0] && (
                                    <img
                                        src={car.images[0]}
                                        alt={car.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h3 className="text-lg font-semibold">{car.name}</h3>
                                <p className="text-gray-600">{car.manufacturer}</p>
                                <p className="text-gray-600">${car.pricePerDay}/day</p>
                                <p className={`text-sm ${car.isAvailable ? 'text-blue-600' : 'text-red-600'}`}>
                                    {car.isAvailable ? 'Available' : 'Not Available'}
                                </p>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => router.push(`/company-dashboard/edit-car/${car.id}`)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleToggleAvailability(car.id, car.isAvailable)}
                                        className={`${
                                            car.isAvailable ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                        } text-white px-3 py-1 rounded text-sm`}
                                    >
                                        {car.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Car
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dates
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((booking) => {
                                    const car = cars.find(c => c.id === booking.carId);
                                    return (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {car?.name || 'Unknown Car'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value as Booking['status'])}
                                                    className={`px-2 py-1 rounded text-sm font-semibold
                                                        ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                ${booking.totalCost}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
} 