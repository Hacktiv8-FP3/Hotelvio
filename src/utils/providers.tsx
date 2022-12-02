import React, { PropsWithChildren } from 'react';
import {
  NavigationComponentProps,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../redux/store';
import { ServicesProvider } from '../services';
import { StoresProvider } from '../stores';

export const SSProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <StoresProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </StoresProvider>
  );
};

// RNN component wrapper (provider)
export const withSS =
  (C: NavigationFunctionComponent) => (props: NavigationComponentProps) =>
    (
      <SSProvider>
        <C {...props} />
      </SSProvider>
    );

export const ReduxProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

// RNN component wrapper (provider)
export const withRedux =
  (C: NavigationFunctionComponent) => (props: NavigationComponentProps) =>
    (
      <ReduxProvider>
        <C {...props} />
      </ReduxProvider>
    );
