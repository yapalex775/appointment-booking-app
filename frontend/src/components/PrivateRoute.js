import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
    const { loading, accessToken } = useAuth();

    if (loading) return null;

    return accessToken ? children : <Navigate to="/login" />;
}
