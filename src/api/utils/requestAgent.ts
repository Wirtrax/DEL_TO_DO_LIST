import axios from 'axios';

const API_URL = 'https://tasks-service-maks1394.amvera.io';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 500,
  // onDownloadProgress: function (progressEvent) {
  //   console.log(progressEvent, 'event');
  // },
});
