import { configureStore } from '@reduxjs/toolkit'
import envReducer from '../features/env/envSlice'

export default configureStore({
  reducer: {
    env: envReducer,
  },
})