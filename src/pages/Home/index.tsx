import React from 'react'
import { useAppSelector } from 'store/hooks'
import { selectReview } from 'store/slices/reviewSlice'
import FeedbackForm from './FeedbackForm'

export const initialValues = {
  name: '',
  email: '',
  rating: null,
  comment: '',
}

const Home = () => {
  const { data: reviews } = useAppSelector(selectReview)

  return (
    <>
      <FeedbackForm initialValues={initialValues} />
    </>
  )
}

export default Home
