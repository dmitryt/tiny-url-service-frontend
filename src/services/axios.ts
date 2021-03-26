import axios from 'axios';

import config from '../config';

const instance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

const securedInstance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

securedInstance.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
    console.log(config.storageKey);
    sessionStorage.removeItem(config.storageKey);
    window.location.href = '/login';
 }
 return error;
});

export {
  securedInstance,
};

export default instance;