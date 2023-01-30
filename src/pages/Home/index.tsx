import React from 'react'
import FeedbackForm from './FeedbackForm'

export const initialValues = {
  name: '',
  email: '',
  rating: 0,
  comment: '',
  recommend: undefined,
}

const Home = () => {
  return (
    <>
      <FeedbackForm initialValues={initialValues} />
    </>
  )
}

export default Home
