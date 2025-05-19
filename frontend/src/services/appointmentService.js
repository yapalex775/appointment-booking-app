import api from '../utils/axios';

export const getAppointments = () => api.get('/appointments');

export const createAppointment = ({ scheduleId, reason }) => api.post('/appointments', { scheduleId, reason });

export const cancelAppointment = (appointmentId) => api.patch(`/appointments/${appointmentId}/cancel`);

export const updateAppointment = (appointmentId, { scheduleId, reason, cancel = false }) => api.patch(`/appointments/${appointmentId}`, { scheduleId, reason, cancel });