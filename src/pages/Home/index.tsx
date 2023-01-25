import React from 'react'
import { useAppSelector } from 'store/hooks'
import { selectReview } from 'store/slices/reviewSlice'

const Home = () => {
  const { data: reviews } = useAppSelector(selectReview)
  console.log('reviews -> ', reviews)

  return (
    <div>
      <span>Home</span>
    </div>
  )
}

export default Home
