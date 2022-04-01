import { createSlice } from '@reduxjs/toolkit'

<<<<<<< HEAD
const env = process.env.REACT_APP_ENV ==='web' ? 'web' : 'electron';

interface Env {
    environnement: string,
=======
const env = process.env.REACT_APP_ENV === 'web' ?  'web' : 'electron';

interface Env {
    environnement: string | undefined,
>>>>>>> e986bf99925d8a4f2ff1b93042ba64702b525d8d
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