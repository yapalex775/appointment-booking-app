import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export default function Register() {
    const { register } = useAuth();
    const [form, setForm] = useState({name: '', email: '', password: ''});
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { name, email, password } = form;
            await register({ name, email, password });
            navigate('/dashboard/appointments');
        } catch (err) {
            alert('Registration failed.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block mb-3">
                    <span className="text-gray-700">Name</span>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                </label>

                <label className="block mb-3">
                    <span className="text-gray-700">Email</span>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                        type="email"
                        name="email"
                        autoComplete='email'
                        onChange={handleChange}
                    />
                </label>
                
                <label className="block mb-4">
                    <span className="text-gray-700">Password</span>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </label>
                
                <div className="flex items-center justify-center gap-3">
                    <button className="bg-primary text-white rounded-md p-4 py-2" type="submit">
                        Register
                    </button>
                    <span className="text-gray-600">or</span>
                    <Link className="text-primary underline" to="/login">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
