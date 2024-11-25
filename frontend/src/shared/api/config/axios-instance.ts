import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 응답: snake_case -> camelCase
axiosInstance.interceptors.response.use(
  (response) => {
    response.data = camelcaseKeys(response.data, { deep: true });
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 요청: camelCase -> snake_case
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data && !(config.data instanceof FormData)) {
      config.data = snakecaseKeys(config.data, { deep: true });
    }
    if (config.params) {
      config.params = snakecaseKeys(config.params, { deep: true });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
