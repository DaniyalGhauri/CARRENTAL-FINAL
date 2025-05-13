

"use client";

import { FirebaseError } from "firebase/app";
import AuthForm from "@/components/auth-form";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [error, setError] = useState('');
    const route = useRouter();

    const resetErrorAfterTimeout = (msg: string) => {
        setError(msg);
        setTimeout(() => setError(''), 3000);
    };

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const userData = userCredential.user;

            if (!userData.emailVerified) {
                setError("User Does Not Exist!");
            }

            if (userData.emailVerified) {
                route.push('/')
            } else {
                setError("Please Verilfy your email before logging in!")
            }

        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                            // Specific error handling for Firebase auth errors
                            if (err.code === "auth/email-already-in-use") {
                                resetErrorAfterTimeout("This email is already in use. Please use a different email.");
                            } else if (err.code === "auth/weak-password") {
                                resetErrorAfterTimeout("Password is too weak. Please choose a stronger password.");
                            } else {
                                resetErrorAfterTimeout("Email or Password Invalid.");
                            }
                        }
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100">
          <div className="bg-white w-2/5 p-10 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Login</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const email = (e.target as any).email.value;
                    const password = (e.target as any).password.value;
                    login(email, password);
                }}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 cursor-pointer transition duration-400"
                >
                    Login
                </button>
            </form>
            <p className="text-center mt-3">Dont Have an Account <Link className="text-green-600" href="/signup">Singup</Link></p>
        </div>
      </div>
    );
}