interface Car {
    id: string;
    name: string;
    brand: string;
    pricePerDay: number;
    image: string;
    available: boolean;
}

export default function CarCard({ car, onBook }: { car: Car; onBook: () => void }) {
    return (
        <div className="bg-white shadow rounded p-4">
            <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold">{car.name}</h2>
            <p className="text-sm text-gray-500">{car.brand}</p>
            <p className="mt-2 font-medium">${car.pricePerDay} / day</p>
            <button
                onClick={onBook}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Book Now
            </button>
        </div>
    );
}
