import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './slices/authSlice';

// 1. Configuration object for Redux Persist
const persistConfig = {
  key: 'root', // The key for the root of our state in local storage
  storage,     // The storage engine to use (localStorage in this case)
  whitelist: ['auth'] // We only want to persist the 'auth' slice of our state
};

// 2. Combine our reducers (if we had more than one)
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if you have them
});

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Create the persistor object
export const persistor = persistStore(store);
