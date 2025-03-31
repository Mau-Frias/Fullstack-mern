import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLoginState from '../hooks/useLoginState'; // Import the custom hook

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loggedIn, setLoggedIn } = useLoginState(); // Use the custom hook

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Login successful!');
                    return response.json();
                }
                alert('Login failed!');
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('Login successful:', data);
                setLoggedIn(true); // Update login status
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    if (loggedIn) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-lg font-bold">You are already logged in!</h2>
                <Link to="/" className="text-blue-500 hover:underline mt-4">
                    Go to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-72 p-5 border border-gray-300 rounded-md"
            >
                <h2 className="text-lg font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Login
                </button>
                <div className="text-center mt-3">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Back to Home
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
