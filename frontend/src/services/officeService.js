import api from '../utils/axios';

export const getOffices = () => api.get('/offices');

export const getUsers = (officeId) => api.get(`/offices/${officeId}/users`);
