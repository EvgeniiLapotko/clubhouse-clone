import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  // headers: {
  //   Authorization: 'Bearer ' + Cookies.get('token'),
  // },
  // withCredentials: true,
});

// instance.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     config.headers.Authorization = window.localStorage.getItem('token');
//   }
//
//   return config;
// });

export default instance;
