import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface SocketState{
    socket: any
}
const initialState: SocketState= {
  socket: null
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<SocketState>) => {
      state.socket = action.payload
    },
    removeSocket: (state) => {
        state.socket = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSocket,removeSocket } = socketSlice.actions

export default socketSlice.reducer