import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await signup(name, email, password);
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    }

    return (
        <div>
            <h1 className="page-title">Signup</h1>

            <form onSubmit={handleSubmit} className="form-box">
                {error && <p className="error">{error}</p>}

                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Signup</button>
            </form>

            <p className="info">Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
