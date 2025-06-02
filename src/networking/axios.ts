import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'https://radley-backend-dev.axion360.io/',
  baseURL: 'http://radley-backend-dev.us-east-1.elasticbeanstalk.com',
});

// Add interceptors for handling global errors
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;