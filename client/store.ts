import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/slices/authSlice'
import userSlice from '@/slices/userSlice'
import projectSlice from '@/slices/projectSlice'
import workspaceSlice from '@/slices/workspaceSlice'
import boardSlice from '@/slices/boardSlice'
import socketSlice from '@/slices/socketSlice'
import notificationSlice from '@/slices/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    project: projectSlice,
    workspace: workspaceSlice,
    board: boardSlice,
    socket: socketSlice,
    notification: notificationSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch