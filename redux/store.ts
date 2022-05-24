import { combineReducers, configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import { Context, createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  roomReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

const makeStore = (context: Context) => store;

export type RootState = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper(makeStore);
export type AppDispatch = typeof store.dispatch;
