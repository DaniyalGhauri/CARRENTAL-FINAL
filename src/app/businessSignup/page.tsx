
"use client";

import { useState } from "react";
import Link from "next/link";
export default function BusinessSignup() {
    const [form, setForm] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        phone: '',
        password: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Business Signup Form Submitted:", form);
        // Add Firebase or API submission logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white w-2/5 p-10 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Business Signup</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Business Name</label>
                        <input
                            type="text"
                            name="businessName"
                            value={form.businessName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Owner Name</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={form.ownerName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Business Address</label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            rows={3}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 cursor-pointer transition duration-400"
                    >
                        Signup
                    </button>

                </form>
                    <p className="text-center mt-3">Already Have An Account  <Link className="text-green-600" href="/login">Login</Link></p>
            </div>
        </div>
    );
}
