import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  withCredentials: true,
});

// instance.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     config.headers.Authorization = window.localStorage.getItem('token');
//   }
//
//   return config;
// });

export default instance;
