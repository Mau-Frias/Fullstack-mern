import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Welcome to the Home Page</h1>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ marginRight: '10px', color: '#007BFF', textDecoration: 'none' }}>
                    Login
                </Link>
                <Link to="/register" style={{ color: '#007BFF', textDecoration: 'none' }}>
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;