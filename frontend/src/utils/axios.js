import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    res => res,
    async (err) => {
        const original = err.config;

        if (err.response?.status === 401 && !original._retry && !original.skipAuthRefresh) {
            original._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        original.headers['Authorization'] = `Bearer ${token}`;
                        return api(original);
                    })
                    .catch(Promise.reject);
            }

            isRefreshing = true;

            try {
                const res = await axios.post('http://localhost:5000/api/auth/refresh', {
                    refreshToken: localStorage.getItem('refreshToken'),
                });

                const newToken = res.data.accessToken;
                localStorage.setItem('accessToken', newToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                processQueue(null, newToken);
                return api(original);
            } catch (error) {
                processQueue(error, null);
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

export default api;
