import { Link } from 'react-router-dom';

import AppointmentCard from '../../components/AppointmentCard';
import { useAppointments } from '../../hooks/useAppointments';

export default function Home() {
    const { appointments, loading, error } = useAppointments();

    if (loading) return <p className="text-center text-gray-600">Loading appointments...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className='sm:flex sm:items-center sm:justify-between mb-4'>
                <h1 className="text-2xl font-bold">Appointments</h1>

                <div className='mt-2 sm:mt-0'>
                    <Link className='text-primary underline' to="/">Book an appointment</Link>
                </div>
            </div>
            {
                appointments.length ? (
                    <div className='grid grid-cols-2 gap-4'>
                        {appointments.map((appointment) => (
                            <AppointmentCard key={appointment.id} appointment={appointment} />
                        ))}
                    </div>
                ) : 'No upcoming appointments...'
            }
        </div>
    );
}
