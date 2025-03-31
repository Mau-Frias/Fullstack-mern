import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
            <div className="mt-5">
                <Link to="/login" className="mr-3 text-blue-500 hover:underline">
                    Login
                </Link>
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;