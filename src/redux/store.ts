import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv';
import { PersistConfig, persistStore, Storage } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import productReducer from './product';
import persistReducer from 'redux-persist/es/persistReducer';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const storage = new MMKV();

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  initializeMMKVFlipper({ default: storage });
  middleware.push(createDebugger());
}

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const rootReducers = combineReducers({
  products: productReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: reduxStorage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: undefined,
};

// Setup Reducers
const persistedRootReducer = persistReducer(persistConfig, rootReducers);

// Create Store
const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
  devTools: true,
});

const makeStore = () => store;

// Setup Store persistence
const persistor = persistStore(store);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;