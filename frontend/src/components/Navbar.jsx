import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    function handleLogout() {
        logout();
        window.location.href = '/login';
    }

    return (
        <nav className="navbar">
            <div className="nav-brand">Personal Finance Manager</div>

            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/addexpense" className="nav-link">Add Expense</Link>
                        <button onClick={handleLogout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
