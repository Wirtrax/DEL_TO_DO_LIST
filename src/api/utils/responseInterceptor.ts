import axios from 'axios';
import { apiClient } from './requestAgent';

const setupResponseInterceptors = () => {
  const responseInterceptor = apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error, 'err');
        console.log(error.response?.data.errText, 'error');
      } else if (error instanceof Error) {
        console.log(error.message);
      }
      return Promise.reject(error);
    }
  );
};

export const initInterceptors = () => {
  setupResponseInterceptors();
};
