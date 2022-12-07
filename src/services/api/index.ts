import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://hotels4.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '8ef93e658amsh7800977d4e1b602p17bba8jsnce81242d02ba',
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
  },
});
