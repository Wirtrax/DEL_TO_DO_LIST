import axios from 'axios';

const API_URL = 'https://tasks-service-maks1394.amvera.io';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 300,
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('успешный запрос');
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.errText || error.message;

      console.log(`Error ${status}:`, message);

      switch (status) {
        case 404:
          console.log('Ресурс не найден');
          break;
        case 500:
          console.log('Ошибка сервера');
          break;
        default:
          console.log('Неизвестная ошибка');
      }
    } else if (error instanceof Error) {
      console.log('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);
