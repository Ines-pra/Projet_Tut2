import { createSlice } from '@reduxjs/toolkit'

const env = process.env.REACT_APP_ENV === 'web' ?  'web' : 'electron';

interface Env {
    environnement: string | undefined,
}

const initialState: Env = {
    environnement: env,
}

export const envSlice = createSlice({
  name: 'env',
  initialState,
  reducers: {
  },
})

export const {} = envSlice.actions

export default envSlice.reducer