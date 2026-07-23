import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return null;
    const isAuthenticated = user || localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return null;
    const isAuthenticated = user || localStorage.getItem('token');
    return isAuthenticated ? <Navigate to="/" /> : children;
}

const App = () => {
    return (
        <div className="app-shell">
            <Navbar />
            <div className="page">
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/addexpense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
                    <Route path="/editexpense/:id" element={<ProtectedRoute><EditExpense /></ProtectedRoute>} />
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
