import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/bdozawa/bdozawa-backend/public/api',
});

api.interceptors.request.use((config) => {
  const currentLang = localStorage.getItem('bdozawa_lang') || 'en';
  config.headers['Accept-Language'] = currentLang;
  return config;
});

export default api;