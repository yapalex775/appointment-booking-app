import api from '../utils/axios';

export const getUserSchedules = (userId, { inclusive, allowedScheduleIds }) => api.get(`/users/${userId}/schedules?inclusive=${inclusive}&allowedScheduleIds=${allowedScheduleIds}`);
