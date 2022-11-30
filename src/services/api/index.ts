import { CounterApi } from './counter';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://hotels4.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'fbff628e58msh41ccc8a5203df5ap19074ajsn346033240c5f',
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
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
