import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://hotels4.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'b5fa158dc2msh0ac99bfc010a662p16b505jsn64d53c5687e1',
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
  },
});
