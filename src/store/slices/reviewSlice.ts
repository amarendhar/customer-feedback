import { createSlice } from '@reduxjs/toolkit'
import { AppState } from 'store'

export type Review = {
  id: string
  name: string
  email: string
  rating: number
  comment: string
  submitted_at: string
}

export type ReviewState = {
  data: Review[]
}

export const initialState: ReviewState = {
  data: [],
}

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.data.push(action.payload)
    },
    removeReview: (state, action) => {
      state.data = state.data.filter((review) => review.id !== action.payload)
    },
  },
})

export const { addReview, removeReview } = reviewSlice.actions

export const selectReview = (state: AppState) => state.reviews

export default reviewSlice.reducer
