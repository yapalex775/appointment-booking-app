import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await login(form.email, form.password);
            navigate('/dashboard/appointments');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Login failed!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
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
                        Login
                    </button>
                    <span className="text-gray-600">or</span>
                    <Link className="text-primary underline" to="/register">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}
