import { useState } from 'react';
import { toast } from 'react-toastify';

import { updateAppointment } from '../services/appointmentService';

export default function useCancelAppointment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cancelAppointment = async (appointmentId) => {
        setLoading(true);
        
        try {
            const res = await updateAppointment(appointmentId, { cancel: true });
            toast.success('Appointment cancelled successfully');
            return res.data.appointment;
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { cancelAppointment, loading, error };
}
