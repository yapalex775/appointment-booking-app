import { useEffect, useState } from 'react';

import { useModal } from '../../hooks/useModal';
import { useAppointments } from '../../hooks/useAppointments';
import useOfficeUsers from '../../hooks/useOfficeUsers';
import useUserSchedules from '../../hooks/useUserSchedules';
import useMakeAppointment from '../../hooks/useMakeAppointment';
import useRescheduleAppointment from '../../hooks/useRescheduleAppointment';

export default function AppointmentModal({ appointment = null }) {
    const { closeModal, modal } = useModal();
    const { users } = useOfficeUsers(appointment?.schedule?.user?.offices[0]?.id || modal.props.office?.id);
    const { userSchedules, fetchSchedules, loading: isFetchingSchedules } = useUserSchedules();
    const { makeAppointment, loading: isCreatingAppointment } = useMakeAppointment();
    const { rescheduleAppointment, loading: isReschedulingAppointment } = useRescheduleAppointment();
    const { setAppointments } = useAppointments();
    const [form, setForm] = useState({
        selectedDentistId: appointment?.schedule?.user?.id || '',
        selectedScheduleId: appointment?.scheduleId || '',
        reason: appointment?.reason || ''
    });

    useEffect(() => {
        if (appointment) {
            const fetchScheds = async () => {
                await fetchSchedules(appointment.schedule.user.id, { inclusive: true, allowedScheduleIds: appointment.scheduleId });
            };

            fetchScheds();
        }
    }, [appointment, fetchSchedules]);

    if (!['appointment', 'reschedule'].includes(modal.type)) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newAppointment = null;

        if (appointment) {
            newAppointment = await rescheduleAppointment({
                appointmentId: appointment.id,
                scheduleId: form.selectedScheduleId,
                reason: form.reason
            });
        } else {
            newAppointment = await makeAppointment({
                scheduleId: form.selectedScheduleId,
                reason: form.reason
            });

            console.log({ newAppointment })
        }

        setAppointments((prev) =>
            prev.map((a) => (a.id === newAppointment.id ? newAppointment : a))
        );

        closeModal();
    };

    const handleDentistChange = async (e) => {
        const dentistId = e.target.value;
    
        setForm((prev) => ({
            ...prev,
            selectedDentistId: dentistId,
            selectedScheduleId: '', // reset schedule when dentist changes
        }));
    
        await fetchSchedules(dentistId, { inclusive: !!appointment, allowedScheduleIds: appointment ? [appointment.scheduleId] : [] });
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">{appointment ? 'Reschedule Appointment' : 'Schedule Appointment'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Office</span>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={appointment?.schedule?.user?.offices[0]?.name || modal.props.office?.name}
                        required
                        disabled
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700">Select a dentist</span>
                    <select
                        value={form.selectedDentistId}
                        onChange={handleDentistChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    >
                        <option value="" disabled>Please select</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                </label>


                <label className="block">
                    <span className="text-gray-700">Select a schedule</span>
                    <select
                        value={form.selectedScheduleId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                        disabled={isFetchingSchedules}
                        name="selectedScheduleId"
                    >
                        <option value="" disabled>Please select</option>
                        {
                            userSchedules.map((uS) => (
                                <option key={uS.id} value={uS.id}>
                                    {new Date(uS.start).toLocaleString()}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700">Reason</span>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        value={form.reason}
                        onChange={handleChange}
                        required
                        name="reason"
                    />
                </label>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                        disabled={isCreatingAppointment || isReschedulingAppointment}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        disabled={isCreatingAppointment || isReschedulingAppointment}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
}
