import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '7c7eaf93f4bdd728a68f7a22f2138a1a', // 🔑 poné tu API key acá
    language: 'es-ES',
  },
});

export default instance;
