
import React from 'react';

import Card from './Card';
import { useModal } from '../hooks/useModal';
import { useAppointments } from '../hooks/useAppointments';
import useCancelAppointment from '../hooks/useCancelAppointment';
import useRescheduleAppointment from '../hooks/useRescheduleAppointment';

const AppointmentCard = ({ appointment }) => {
    const { cancelAppointment, loading: isCancellingAppointment } = useCancelAppointment();
    const { setAppointments } = useAppointments();
    const { loading: isReschedulingAppointment } = useRescheduleAppointment();
    const { openModal } = useModal();

    const handleConfirm = async () => {
        const updatedAppointment = await cancelAppointment(appointment.id);
        setAppointments((prev) =>
            prev.map((a) => (a.id === updatedAppointment.id ? updatedAppointment : a))
        );
    };

    const handleCancel = () => {
        openModal('confirm', {
            onConfirm: handleConfirm,
            message: 'Are you sure you want to cancel this appointment?'
        });
    };

    const handleReschedule = async () => {
        openModal('reschedule', {
            appointment
        });
    };

    return (
        <Card>
            <h2 className="text-xl font-semibold text-purple-700 mb-2">
                {appointment.cancelledAt ? 'Cancelled Appointment' : 'Upcoming Appointment'} - {appointment.schedule.user.offices[0].name}
            </h2>

            <p className="text-gray-600">{appointment.schedule.user.name}</p>
            <p className="text-gray-600 mb-4">
                {new Date(appointment.schedule.start).toLocaleDateString()} {new Date(appointment.schedule.start).toLocaleTimeString()} - {new Date(appointment.schedule.end).toLocaleTimeString()}
            </p>

            <div className='flex items-center justify-end gap-4'>
                {
                    !appointment.cancelledAt && <button onClick={handleCancel} className='text-primary' disabled={isCancellingAppointment || isReschedulingAppointment}>Cancel</button>
                }
                <button onClick={handleReschedule} className='text-primary' disabled={isCancellingAppointment || isReschedulingAppointment}>Reschedule</button>
            </div>
        </Card>
    );
};

export default AppointmentCard;
