import React, { useState } from 'react';
import authService from '../appwrite/auth.service';
import { login, logout } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting login
        try {
            const userData = await authService.login({ email, password });
            if (userData) {
                let currentUser = await authService.getCurrentUser();
                dispatch(login(currentUser));
                navigate('/');
            }
        } catch (err) {
            await authService.logout();
            dispatch(logout());
            setError(err.message);
        } finally {
            setLoading(false); // Set loading to false after login attempt
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h2 className="text-4xl font-bold mb-8">Login</h2>
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <div className="animate-spin border-t-2 border-white border-solid rounded-full w-5 h-5"></div>
                        ) : (
                            'Login'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
