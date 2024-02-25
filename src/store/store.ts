import { combineReducers, configureStore } from '@reduxjs/toolkit';
import swapReducer from './features/swap.slice.ts';

const reducers = combineReducers({
    swap: swapReducer,
});

export const store = configureStore({
    reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
