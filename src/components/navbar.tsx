"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from '../lib/authContext'
import Link from "next/link";
import { Navigation } from "lucide-react";

const Navbar = () => {
  const [showLink, setShowLink] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    setShowLogoutPopup(true); 
  };
  const toggleLink = () => {
    setShowLink(!showLink);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    logout();
    router.push("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Close the logout confirmation popup
  };

  const navigateTo = (path: string) => {
    setShowLink(false); // Close the mobile menu if open
    router.push(path); // Navigate to the specified path
  };

  return (
    <header className="flex flex-wrap flex-row justify-between md:items-center md:space-x-4 bg-white py-6 px-6 relative shadow-md">
      <button onClick={() => navigateTo("/")} className="block">
      <Link href="/" className="flex items-center space-x-2">
        <Navigation className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">SkillMap Navigator</span>
      </Link>

      </button>
      <button
      onClick={toggleLink}
      className="inline-block md:hidden w-10 h-10 bg-gray-200 text-gray-600 p-2 rounded-lg shadow hover:shadow-md transition duration-200"
    >
      <svg
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>

    <nav
      className={`${
        showLink ? "" : "hidden"
      } md:inline-flex absolute md:relative top-16 left-0 md:top-0 z-20 flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-white shadow-lg rounded-lg md:rounded-none md:shadow-none md:bg-transparent p-6 pt-0 md:p-0`}
    >
      <button
        onClick={() => navigateTo("/")}
        className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
          pathname === "/" ? "text-indigo-600 bg-gray-100" : "text-gray-600 bg-white"
        } hover:bg-gray-50`}
      >
        Home
      </button>
      <button
        onClick={() => navigateTo("/how")}
        className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
          pathname === "/how" ? "text-indigo-600 bg-gray-100" : "text-gray-600 bg-white"
        } hover:bg-gray-50`}
      >
        How it Works
      </button>
      {user && user.role === "Employee" && (
        <button
          onClick={() => navigateTo("/employeeForm")}
          className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
            pathname === "/employeeForm"
              ? "text-indigo-600 bg-gray-100"
              : "text-gray-600 bg-white"
          } hover:bg-gray-50`}
        >
          Employee
        </button>
      )}
      {user && user.role === "Company" && (
        <button
          onClick={() => navigateTo("/CorpForm")}
          className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
            pathname === "/CorpForm"
              ? "text-indigo-600 bg-gray-100"
              : "text-gray-600 bg-white"
          } hover:bg-gray-50`}
        >
          Corporation
        </button>
      )}
      {user && user.role === "Company" && (
      <button
        onClick={() => navigateTo("/jobs")}
        className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
          pathname === "/jobs"
            ? "text-indigo-600 bg-gray-100"
            : "text-gray-600 bg-white"
        } hover:bg-gray-50`}
      >
        Report
      </button>
      )}
{user && user.role === "Company" && (
      <button
        onClick={() => navigateTo("/courses")}
        className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
          pathname === "/courses"
            ? "text-indigo-600 bg-gray-100"
            : "text-gray-600 bg-white"
        } hover:bg-gray-50`}
      >
        Courses
      </button>
)}
{user && user.role === "Employee" && (
      <button
        onClick={() => navigateTo("/courses/ecourses")}
        className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
          pathname === "/courses"
            ? "text-indigo-600 bg-gray-100"
            : "text-gray-600 bg-white"
        } hover:bg-gray-50`}
      >
        Courses
      </button>
)}
      <button
        onClick={() => navigateTo("/about")}
        className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
          pathname === "/about"
            ? "text-indigo-600 bg-gray-100"
            : "text-gray-600 bg-white"
        } hover:bg-gray-50`}
      >
        About us
      </button>
      {user ? (
          <button
            onClick={handleLogout}
            className="block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 text-gray-600 bg-white hover:bg-gray-50"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigateTo("/login")}
            className={`block py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
              pathname === "/login"
                ? "text-indigo-600 bg-gray-100"
                : "text-gray-600 bg-white"
            } hover:bg-gray-50`}
          >
            Login
          </button>
        )}
      </nav>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Logout</h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;