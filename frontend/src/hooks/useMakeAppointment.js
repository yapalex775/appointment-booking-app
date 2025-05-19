import { useState } from "react";
import { toast } from "react-toastify";

import { createAppointment } from "../services/appointmentService";

const useMakeAppointment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeAppointment = async ({ scheduleId, reason }) => {
        setLoading(true);

        try {
            const res = await createAppointment({ scheduleId, reason });
            toast.success('Appointment created successfully');
            return res.data.appointment;
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { makeAppointment, loading, error };
};

export default useMakeAppointment;