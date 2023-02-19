import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  _id: string | null,
  displayName: string,
  email: string,
}

export interface UserState{
    user: User | null
}
const initialState: UserState= {
  user:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    removeUserInfo: (state) => {
        state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo,removeUserInfo } = userSlice.actions

export default userSlice.reducer