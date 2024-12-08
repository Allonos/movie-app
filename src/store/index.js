import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import productionSlice from './productionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    production: productionSlice
  }
});

export default store;