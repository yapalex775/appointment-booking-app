import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getAppointments } from '../services/appointmentService';
import { useAuth } from '../hooks/useAuth';

export const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            setLoading(true);

            try {
                const res = await getAppointments()
                setAppointments(res.data);
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong.');
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return (
        <AppointmentsContext.Provider value={{ appointments, setAppointments, loading, error }}>
            {children}
        </AppointmentsContext.Provider>
    );
}
