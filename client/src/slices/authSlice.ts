import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  token: string | null
}

const initialState: CounterState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    removeToken: (state) => {
        state.token = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken,removeToken } = authSlice.actions

export default authSlice.reducer