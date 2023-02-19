import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Workspace{
    _id: string,
    title: string,
    key: string,
    description: string,
    members: any[],
    owner: any,
}
export interface WorkspaceState {
  workspaceList: Workspace[] | null,
  currentWorkspace: Workspace | null,
}

const initialState: WorkspaceState = {
  workspaceList : null,
  currentWorkspace: null
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaceList: (state, action: PayloadAction<Workspace[]>) => {
      state.workspaceList = action.payload;
    },
    setCurrentWorkspace: (state, action: PayloadAction<Workspace>) => {
        state.currentWorkspace = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setWorkspaceList,setCurrentWorkspace } = workspaceSlice.actions

export default workspaceSlice.reducer