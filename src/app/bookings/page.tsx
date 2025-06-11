"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, getUserBookings, updateBooking, getCar } from '@/lib/firebase';
import { Booking, Car } from '@/types';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface BookingWithCar extends Booking {
    car?: Car;
}

export default function BookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<BookingWithCar[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    router.push('/login');
                    return;
                }

                const userBookings = await getUserBookings(user.uid);

                // Fetch car details for each booking
                const bookingsWithCars = await Promise.all(
                    userBookings.map(async (booking: Booking) => {
                        const car = await getCar(booking.carId);
                        return { ...booking, car };
                    })
                );

                setBookings(bookingsWithCars);
            } catch (err) {
                console.error('Error loading bookings:', err);
                setError('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [router]);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            await updateBooking(bookingId, {
                status: 'cancelled'
            });

            setBookings(bookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: 'cancelled' }
                    : booking
            ));
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setError('Failed to cancel booking');
        }
    };

    const handlePayment = async (bookingId: string) => {
        try {
            await updateBooking(bookingId, {
                paymentStatus: 'completed'
            });

            setBookings(bookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, paymentStatus: 'completed' }
                    : booking
            ));
        } catch (err) {
            console.error('Error processing payment:', err);
            setError('Failed to process payment');
        }
    };

    const handleRatingSubmit = async (bookingId: string, rating: number) => {
        try {
            const booking = bookings.find(b => b.id === bookingId);
            if (!booking || !booking.car) return;

            // Update booking with rating
            await updateBooking(bookingId, {
                rating: rating
            });

            // Update car's average rating
            const carRef = doc(db, 'cars', booking.carId);
            const carDoc = await getDoc(carRef);

            if (carDoc.exists()) {
                const carData = carDoc.data();
                const currentReviews = carData.reviews || [];
                const newReview = {
                    id: Date.now().toString(),
                    userId: auth.currentUser?.uid,
                    userName: auth.currentUser?.displayName || 'Anonymous',
                    rating: rating,
                    comment: '',
                    createdAt: new Date()
                };

                const updatedReviews = [...currentReviews, newReview];
                const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
                const averageRating = totalRating / updatedReviews.length;

                await updateDoc(carRef, {
                    reviews: updatedReviews,
                    averageRating: averageRating
                });
            }

            // Update local state
            setBookings(bookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, rating }
                    : booking
            ));

            setSelectedRating(null);
            setRatingBookingId(null);
        } catch (err) {
            console.error('Error submitting rating:', err);
            setError('Failed to submit rating');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bookings</h1>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {booking.car?.images[0] && (
                                <img
                                    src={booking.car.images[0]}
                                    alt={booking.car.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">
                                    {booking.car?.name || 'Unknown Car'}
                                </h3>
                                <div className="mt-2 space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Dates:</span>{' '}
                                        {new Date(booking.startDate).toLocaleDateString()} -
                                        {new Date(booking.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Total Cost:</span>{' '}
                                        ${booking.totalCost}
                                    </p>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-600">Status:</span>
                                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-600">Payment:</span>
                                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${booking.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'}`}
                                        >
                                            {booking.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                {booking.status === 'pending' && (
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                                        >
                                            Cancel Booking
                                        </button>
                                        {booking.paymentStatus === 'pending' && (
                                            <button
                                                onClick={() => handlePayment(booking.id)}
                                                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                    </div>
                                )}

                                {booking.status === 'completed' && !booking.car?.reviews.some(r => r.userId === auth.currentUser?.uid) && (
                                    <div className="mt-4">
                                        {ratingBookingId === booking.id ? (
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="flex space-x-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => setSelectedRating(star)}
                                                            className="focus:outline-none"
                                                        >
                                                            {star <= (selectedRating || 0) ? (
                                                                <StarIcon className="h-6 w-6 text-yellow-400" />
                                                            ) : (
                                                                <StarOutlineIcon className="h-6 w-6 text-gray-300" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => selectedRating && handleRatingSubmit(booking.id, selectedRating)}
                                                    disabled={!selectedRating}
                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    Submit Rating
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setRatingBookingId(booking.id)}
                                                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                                                >
                                                    Rate Experience
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {bookings.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <p>You haven't made any bookings yet.</p>
                        <button
                            onClick={() => router.push('/cars')}
                            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Browse Cars
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 