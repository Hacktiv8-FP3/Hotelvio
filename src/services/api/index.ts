import { CounterApi } from './counter';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://mashvisor-api.p.rapidapi.com',
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': 'cf7770bc48mshb26ada8c9b90276p199c97jsnf4ca622fb818',
    'X-RapidAPI-Host': 'mashvisor-api.p.rapidapi.com',
  },
});

export class ApiService implements IService {
  private inited = false;

  counter: CounterApi;

  constructor() {
    this.counter = new CounterApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
