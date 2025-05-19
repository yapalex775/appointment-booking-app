import { useState, useEffect } from 'react';

import { getUsers } from '../services/officeService';

export default function useOfficeUsers(officeId) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!officeId) return;

        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await getUsers(officeId);
                
                if (isMounted) {
                    setUsers(res.data.users);
                }
            } catch (err) {
                console.error(err);
                if (isMounted) {
                    setError(err.response?.data?.message || 'Failed to fetch dentists');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [officeId]);

    return { users, loading, error };
}
