// pages/checkout.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
    const params = useSearchParams();

    const carName = params.get("carName");
    const pricePerDay = params.get("price");
    const from = params.get("from");
    const to = params.get("to");

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <p><strong>Car:</strong> {carName}</p>
            <p><strong>From:</strong> {from}</p>
            <p><strong>To:</strong> {to}</p>
            <p><strong>Rate:</strong> ${pricePerDay}/day</p>
            {/* You can calculate total cost using JS if you want */}
            <button className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Confirm Booking
            </button>
        </div>
    );
}
