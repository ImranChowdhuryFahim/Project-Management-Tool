import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Project{
    _id: string,
    title: string,
    workspaceKey: string,
    key: string,
    description: string,
    members: any[],
    teamLead: string,
}
export interface ProjectState {
  projectList: Project[] | null,
  currentProject: Project | null
}

const initialState: ProjectState = {
  projectList: null,
  currentProject: null
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectList: (state, action: PayloadAction<Project[]>) => {
      state.projectList = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
        state.currentProject = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProjectList,setCurrentProject } = projectSlice.actions

export default projectSlice.reducer