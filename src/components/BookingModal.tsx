import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingModal({ car, onClose }: { car: any; onClose: () => void }) {
    const [name, setName] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const router = useRouter();

    const handleBooking = () => {
        if (!name || !fromDate || !toDate) return alert("Please fill all fields");
        console.log("Booking Details:", {
            carId: car.id,
            carName: car.name,
            customerName: name,
            fromDate,
            toDate,
        });
        router.push(`/checkout?carName=${car.name}&price=${car.pricePerDay}&from=${fromDate}&to=${toDate}`);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
                <h2 className="text-xl font-semibold mb-4">Book {car.name}</h2>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button onClick={handleBooking} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
