import React from 'react';

import { NavigationService } from './navigation';
import { OnStartService } from './onStart';
import { TranslateService } from './translate';

export class Services {
  static async init(): PVoid {
    for (const key in services) {
      if (Object.prototype.hasOwnProperty.call(services, key)) {
        const s = (services as any)[key] as IService;

        if (s.init) {
          await s.init();
        }
      }
    }
  }

  // services list
  t = new TranslateService();
  nav = new NavigationService();
  onStart = new OnStartService();
}
export const services = new Services();

// Providers and hooks
const ServicesContext = React.createContext<Services>(services);
export const ServicesProvider = ({ children }: any) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
);
export const useServices = (): Services => React.useContext(ServicesContext);
