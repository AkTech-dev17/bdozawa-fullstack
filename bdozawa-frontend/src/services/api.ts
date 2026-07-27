import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Match your local Laravel API URL
});

api.interceptors.request.use((config) => {
  const currentLang = localStorage.getItem('bdozawa_lang') || 'en';
  config.headers['Accept-Language'] = currentLang;
  return config;
});

export default api;