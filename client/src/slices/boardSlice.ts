import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
    _id: string | null,
    displayName: string,
    email: string,
  }
export interface Issue{
    workspaceKey: string,
    projectKey: string,
    _id: string,
    title: string,
    description: string,
    priority: string,
    assignee: User[],
    isDone: boolean,
    key: string,
    dueDate: Date,
    createdAt: Date,
    updatedAt: Date,

}
export interface Column{
    _id: string,
    title: string,
    issues: Issue[]
}

export interface Board{
    _id: string,
    title: string,
    workspaceKey:string,
    projectKey:string,
    columns: Column[],
    nextIssueId: number,
}

export interface BoardState{
    board: Board | null
}


const initialState: BoardState = {
  board: null
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      state.board = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setBoard } = boardSlice.actions

export default boardSlice.reducer