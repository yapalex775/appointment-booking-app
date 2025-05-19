import { useState } from 'react';
import { toast } from 'react-toastify';

import { updateAppointment } from '../services/appointmentService';

const useRescheduleAppointment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const rescheduleAppointment = async ({ appointmentId, scheduleId, reason }) => {
        setLoading(true);
        
        try {
            const res = await updateAppointment(appointmentId, { scheduleId, reason });
            toast.success('Appointment rescheduled successfully');
            return res.data.appointment;
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { rescheduleAppointment, loading, error };
};

export default useRescheduleAppointment;
