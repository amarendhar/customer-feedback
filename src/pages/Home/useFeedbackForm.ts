import React, { useCallback } from 'react'
import { v4 } from 'uuid'
import moment from 'moment'
import { useAppDispatch } from 'store/hooks'
import { addReview } from 'store/slices/reviewSlice'

export type FormValues = {
  name: string
  email: string
  rating: null | number
  comment: string
}

const useFeedbackForm = () => {
  const dispatch = useAppDispatch()
  const [hover, setHover] = React.useState(0)

  const onSubmit = useCallback(
    (values: FormValues) => {
      dispatch(
        addReview({
          ...values,
          id: v4(),
          createdAt: moment().format('x'),
        })
      )
    },
    [dispatch]
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
