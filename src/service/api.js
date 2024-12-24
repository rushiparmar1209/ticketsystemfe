import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Backend server ka URL
});

export default API;
