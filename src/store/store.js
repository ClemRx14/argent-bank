import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/loginSlice.js'

const store = configureStore({
  reducer: {
    user: loginReducer,
  },
});

export default store;
