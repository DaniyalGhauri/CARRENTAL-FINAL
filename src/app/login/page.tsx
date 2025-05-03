"use client";

import { FirebaseError } from "firebase/app";
import AuthForm from "@/components/auth-form";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        <AuthForm
            func={login}
            errorMsg={error}
        />
    );
}