import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white border-b shadow-md px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-purple-700">Home</Link>

            <div className="relative">
                {!user ? (
                    <Link to="/login" className="text-purple-700 font-medium hover:underline">
                        Login
                    </Link>
                ) : (
                    <>
                        <button
                            onClick={() => setOpen(!open)}
                            className="text-purple-700 font-medium hover:underline focus:outline-none"
                        >
                        Hi, {user.name}
                        </button>
                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                                <Link
                                    to="/"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setOpen(false)}
                                >
                                    Book appointment
                                </Link>
                                <Link
                                    to="/dashboard/appointments"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setOpen(false)}
                                >
                                    Appointments
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
