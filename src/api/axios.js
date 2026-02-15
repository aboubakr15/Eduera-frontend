import axios from 'axios';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Response Interceptor: Handle 401 & Refresh Token
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already retried the request
        if (error.response && error.response.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                // If already refreshing, queue the request
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                // No refresh token available, force logout
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const response = await api.post('/api/token/refresh/', {
                    refresh: refreshToken
                });

                if (response.status === 200) {
                    const { access, refresh } = response.data;

                    // Update storage
                    localStorage.setItem('access_token', access);
                    localStorage.setItem('refresh_token', refresh); // Rotation

                    // Update header for this instance
                    api.defaults.headers.common['Authorization'] = 'Bearer ' + access;

                    // Process queued requests
                    processQueue(null, access);

                    // Retry original request
                    originalRequest.headers['Authorization'] = 'Bearer ' + access;
                    return api(originalRequest);
                }
            } catch (err) {
                processQueue(err, null);
                // Refresh failed (expired or invalid), force logout
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
