import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="card">
            <h1>404</h1>
            <p>Page not found</p>
            <Link to="/" className="nav-link">Go Home</Link>
        </div>
    );
};

export default NotFound;
