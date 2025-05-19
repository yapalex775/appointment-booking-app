import { useCallback, useState } from 'react';

import { getUserSchedules } from '../services/userService';

const useUserSchedules = () => {
    const [userSchedules, setUserSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSchedules = useCallback(
        async (userId, { inclusive, allowedScheduleIds = [] }) => {
            setLoading(true);
            try {
                const res = await getUserSchedules(userId, { inclusive, allowedScheduleIds });
                setUserSchedules(res.data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to fetch schedules');
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { userSchedules, loading, error, fetchSchedules };
};

export default useUserSchedules;
