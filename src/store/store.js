import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice.js';
import userReducer from '../features/userSlice.js';

const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
