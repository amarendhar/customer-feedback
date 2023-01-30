import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import moment from 'moment'
import { useAppDispatch } from 'store/hooks'
import { addReview, Review } from 'store/slices/reviewSlice'

export enum Recommend {
  NONE = 'none',
  YES = 'yes',
  NO = 'no',
}

const useFeedbackForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [hover, setHover] = React.useState(0)

  const onSubmit = useCallback(
    (values: Omit<Review, 'id' | 'createdAt'>) => {
      const review = {
        ...values,
        id: v4(),
        createdAt: moment().format('x'),
      }
      delete review.recommend

      if (String(values.recommend) === 'true') {
        review.recommend = true
      } else if (String(values.recommend) === 'false') {
        review.recommend = false
      }

      dispatch(addReview(review))
      navigate('/reviews')
    },
    [dispatch, navigate]
  )

  const onRatingHover = useCallback(
    (e: React.SyntheticEvent, value: number) => setHover(value),
    []
  )

  return {
    hover,
    onRatingHover,
    onSubmit,
  }
}

export default useFeedbackForm
