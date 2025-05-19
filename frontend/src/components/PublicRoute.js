import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export default function PublicRoute({ children }) {
    const { loading, accessToken } = useAuth();

    if (loading) return null;

    return accessToken ? <Navigate to="/dashboard/appointments" /> : children;
}
