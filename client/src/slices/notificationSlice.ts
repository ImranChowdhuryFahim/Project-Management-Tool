import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Notification{
  email:string,
  body: string
}
export interface NotificationState {
  notifications: Notification[],
  unreadCount: number, 
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount:0
}

export const notificationtSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      if(state.notifications)
      {
        state.notifications = [...state.notifications,action.payload]
        state.unreadCount+=1
      }
        
    },
    clearNotificationCount: (state) => {
      state.unreadCount = 0;},
  },
})

// Action creators are generated for each case reducer function
export const { setNotifications,addNotification } = notificationtSlice.actions

export default notificationtSlice.reducer