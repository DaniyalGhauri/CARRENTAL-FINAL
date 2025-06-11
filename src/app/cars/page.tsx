"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, getAvailableCars, createBooking } from '@/lib/firebase';
import { Car } from '@/types';

export default function CarsPage() {
    const router = useRouter();
    const [cars, setCars] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        manufacturer: '',
        sortBy: ''
    });
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [bookingDates, setBookingDates] = useState({
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const loadCars = async () => {
            try {
                const availableCars = await getAvailableCars();
                setCars(availableCars);
                setFilteredCars(availableCars);
            } catch (err) {
                setError('Failed to load available cars');
            } finally {
                setLoading(false);
            }
        };

        loadCars();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        applyFilters(term, filters);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        applyFilters(searchTerm, newFilters);
    };

    const applyFilters = (term: string, currentFilters: typeof filters) => {
        let filtered = cars.filter(car => {
            const matchesSearch = car.name.toLowerCase().includes(term) ||
                                  car.manufacturer.toLowerCase().includes(term);
            const matchesPrice = (!currentFilters.minPrice || car.pricePerDay >= Number(currentFilters.minPrice)) &&
                                 (!currentFilters.maxPrice || car.pricePerDay <= Number(currentFilters.maxPrice));
            const matchesManufacturer = !currentFilters.manufacturer || car.manufacturer === currentFilters.manufacturer;

            return matchesSearch && matchesPrice && matchesManufacturer;
        });

        if (currentFilters.sortBy) {
            filtered.sort((a, b) => {
                switch (currentFilters.sortBy) {
                    case 'price-asc': return a.pricePerDay - b.pricePerDay;
                    case 'price-desc': return b.pricePerDay - a.pricePerDay;
                    case 'rating': return b.averageRating - a.averageRating;
                    default: return 0;
                }
            });
        }

        setFilteredCars(filtered);
    };

    const handleBooking = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return router.push('/login');

            if (!selectedCar || !bookingDates.startDate || !bookingDates.endDate) {
                return setError('Please select dates for your booking');
            }

            const startDate = new Date(bookingDates.startDate);
            const endDate = new Date(bookingDates.endDate);
            const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const totalCost = days * selectedCar.pricePerDay;

            const bookingData = {
                carId: selectedCar.id,
                userId: user.uid,
                companyId: selectedCar.companyId,
                startDate,
                endDate,
                totalCost,
                status: 'pending',
                paymentStatus: 'pending',
                createdAt: new Date()
            };

            await createBooking(bookingData);
            router.push('/bookings');
        } catch (err) {
            setError('Failed to create booking');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl font-semibold">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow">
                    {error}
                </div>
            </div>
        );
    }

    if (filteredCars.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto text-center bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Cars Available</h2>
                    <p className="text-gray-500">Please check back later for available cars.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>

                {/* Car Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                        <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {car.images[0] && (
                                <img
                                    src={car.images[0]}
                                    alt={car.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4 space-y-2">
                                <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                                <p className="text-gray-500">{car.manufacturer}</p>
                                <p className="text-blue-600 font-semibold">${car.pricePerDay}/day</p>
                                <p className="text-sm text-gray-500">Fuel Efficiency: {car.fuelEfficiency}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1">{car.averageRating.toFixed(1)} ({car.reviews.length} reviews)</span>
                                </div>

                                <div className="pt-2 space-y-2">
                                    <div className="">
                                        <p>Start Date</p>
                                    </div>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={selectedCar?.id === car.id ? bookingDates.startDate : ''}
                                        onChange={(e) => {
                                            setSelectedCar(car);
                                            setBookingDates({ ...bookingDates, startDate: e.target.value });
                                        }}
                                    />
                                    <div className="">
                                        <p>End Date</p>
                                    </div>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        min={bookingDates.startDate}
                                        value={selectedCar?.id === car.id ? bookingDates.endDate : ''}
                                        onChange={(e) => {
                                            setSelectedCar(car);
                                            setBookingDates({ ...bookingDates, endDate: e.target.value });
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            setSelectedCar(car);
                                            handleBooking();
                                        }}
                                        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Error Modal */}
                {error && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => setError('')}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
