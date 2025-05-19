import { useState, useEffect } from 'react';

import { getOffices } from '../services/officeService';

const useOffices = () => {
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await getOffices();
                
                if (isMounted) {
                    setOffices(res.data);
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
    }, []);

    return { offices, loading, error };
};

export default useOffices;
