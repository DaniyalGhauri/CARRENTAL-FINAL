"use client";

import { FirebaseError } from "firebase/app";
import AuthForm from "@/components/auth-form";
import { auth,db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SignUp() {
    const [error, setError] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false); // Track signup completion
    const route = useRouter();

    const resetErrorAfterTimeout = (msg: string) => {
        setError(msg);
        setTimeout(() => setError(''), 3000);
    };

    const signUp = async (email: string, password: string, username?: string, role?: string) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
    
            await sendEmailVerification(user);
            resetErrorAfterTimeout("Verification email sent! Please check your inbox.");
    
            saveUserToFirebase(email, password, username || "Unknown User", user.uid, role || "customer");
    
            setIsSignedUp(true);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                // Specific error handling for Firebase auth errors
                if (err.code === "auth/email-already-in-use") {
                    resetErrorAfterTimeout("This email is already in use. Please use a different email.");
                } else if (err.code === "auth/weak-password") {
                    resetErrorAfterTimeout("Password is too weak. Please choose a stronger password.");
                } else {
                    resetErrorAfterTimeout("Something went wrong. Please try again.");
                }
            } else {
                resetErrorAfterTimeout("An unexpected error occurred. Please try again.");
            }
        }
    };
    
    const saveUserToFirebase = async (email: string, password: string, username: string, uid: string, role: string) => {
        const user = { email, password, uid, username, role }; // Include role
        const docRef = doc(db, "users", uid);

        await setDoc(docRef, user);
    };

    useEffect(() => {
        if (isSignedUp) {
            route.push('/emailVerification');
        }
    }, [isSignedUp, route]); 

 

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="bg-white w-2/5 p-10 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">Signup</h2>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form
              onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as any).email.value;
                  const password = (e.target as any).password.value;
                  const username = (e.target as any).username.value;
                  signUp(email, password, username);
              }}
              className="space-y-4"
          >
              <div>
                  <label className="block text-sm font-medium">User Name</label>
                  <input
                      type="username"
                      name="username"
                      className="w-full border border-gray-300 p-2 rounded"
                      required
                  />
              </div>
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
                 SignUp
              </button>
          </form>
          <p className="text-center mt-3">Already Have An Account  <Link className="text-green-600" href="/login">Login</Link></p>
      </div>
    </div>
        // <AuthForm
        //     func={signUp}
        //     signup={true}
        //     errorMsg={error}
        // />
    );
}
