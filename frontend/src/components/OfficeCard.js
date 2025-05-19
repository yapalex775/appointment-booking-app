import React from 'react';

import useScheduleAppointment from '../hooks/useScheduleAppointment';
import Card from './Card';

const OfficeCard = ({ office }) => {
    const { scheduleAppointment } = useScheduleAppointment();

    return (
        <Card>
            <h2 className="text-xl font-semibold text-purple-700 mb-2">{office.name}</h2>
            <p className="text-gray-600 mb-4">{office.address}</p>

            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Services:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    {office.services.map((service) => (
                        <li key={service.id}>{service.name}</li>
                    ))}
                </ul>
            </div>

            <button
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 w-full"
                onClick={() => scheduleAppointment(office)}
            >
                Schedule an Appointment
            </button>
        </Card>
    );
};

export default OfficeCard;
