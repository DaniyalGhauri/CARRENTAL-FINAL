"use client";

import { useState } from "react";
import CarCard from "@/components/CarCard";
import BookingModal from "@/components/BookingModal";

const dummyCars = [
    { id: "1", name: "Toyota Corolla", brand: "Toyota", pricePerDay: 50, fuelEfficiency: 18, image: "/images/corolla.jpg", available: true },
    { id: "2", name: "Honda Civic", brand: "Honda", pricePerDay: 65, fuelEfficiency: 16, image: "/images/civic.jpg", available: true },
    { id: "3", name: "Hyundai Elantra", brand: "Hyundai", pricePerDay: 55, fuelEfficiency: 20, image: "/images/elantra.jpg", available: true },
];

export default function AvailableCars() {
    const [cars, setCars] = useState(dummyCars);
    const [selectedCar, setSelectedCar] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    const applyFilter = (type: string) => {
        let sortedCars = [...cars];
        switch (type) {
            case "priceLow":
                sortedCars.sort((a, b) => a.pricePerDay - b.pricePerDay);
                break;
            case "priceHigh":
                sortedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
                break;
            case "fuelBest":
                sortedCars.sort((a, b) => a.fuelEfficiency - b.fuelEfficiency);
                break;
            case "fuelWorst":
                sortedCars.sort((a, b) => b.fuelEfficiency - a.fuelEfficiency);
                break;
            case "brandAZ":
                sortedCars.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case "brandZA":
                sortedCars.sort((a, b) => b.brand.localeCompare(a.brand));
                break;
        }
        setCars(sortedCars);
        setShowFilters(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Available Cars</h1>

            {/* Filter Dropdown */}
            <div className="relative mb-6">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Filter Options
                </button>

                {showFilters && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded p-4 z-10 w-64">
                        <p className="font-semibold mb-2">Sort By</p>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => applyFilter("priceLow")}>Price: Low to High</button></li>
                            <li><button onClick={() => applyFilter("priceHigh")}>Price: High to Low</button></li>
                            <li><button onClick={() => applyFilter("fuelBest")}>Fuel Efficiency: Best First</button></li>
                            <li><button onClick={() => applyFilter("fuelWorst")}>Fuel Efficiency: Worst First</button></li>
                            <li><button onClick={() => applyFilter("brandAZ")}>Brand: A → Z</button></li>
                            <li><button onClick={() => applyFilter("brandZA")}>Brand: Z → A</button></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} onBook={() => setSelectedCar(car)} />
                ))}
            </div>

            {selectedCar && <BookingModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
        </div>
    );
}
