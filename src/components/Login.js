
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const data = response.data;
            if (data && data.email === email) {
                // Handle successful login
                // console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
                localStorage.setItem('type', 'user');
                navigate('/');
                window.location.reload(); // Refresh the page to update the navbar
            } else {
                // Handle login failure
                alert('Enter valid details');
                // console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network or other errors
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">User Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            placeholder='Enter your email'
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            placeholder='Enter your password'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

