import { fields } from 'pages/Home/FeedbackForm'
import { FormValues } from 'pages/Home/useFeedbackForm'

export const validateName = (name: string) => {
  if (!name) {
    return fields.name.helperText.empty
  }
  if (name.length < 6 || name.length > 20) {
    return fields.name.helperText.requiredLength
  }
  if (!/^[A-Za-z ]+$/.test(name)) {
    return fields.name.helperText.requiredPattern
  }

  return ''
}

export const validateEmailID = (emailId: string) => {
  if (!emailId) {
    return fields.email.helperText.empty
  }
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailId
    )
  ) {
    return fields.email.helperText.requiredPattern
  }

  return ''
}

export const validateRating = (rating: string) => {
  const normalizeRating = Number(rating)

  if (!normalizeRating) {
    return fields.rating.helperText.empty
  }
  if (normalizeRating < 1 || normalizeRating > 5) {
    return fields.rating.helperText.requiredLength
  }

  return ''
}

export const validateComment = (comment: string) => {
  if (!comment) {
    return fields.comment.helperText.empty
  }
  if (comment.length < 20 || comment.length > 100) {
    return fields.comment.helperText.requiredLength
  }
  if (!/^[A-Za-z ]+$/.test(comment)) {
    return fields.comment.helperText.requiredPattern
  }

  return ''
}

export type Validators = Record<
  'name' | 'email' | 'rating' | 'comment',
  (val: string) => string
>

export const validators: Validators = {
  name: validateName,
  email: validateEmailID,
  rating: validateRating,
  comment: validateComment,
}

const validate = (values: FormValues) => {
  const errors = Object.entries(values).reduce((acc, [name, value]) => {
    const error = validators[name as keyof Validators](String(value))

    if (error) {
      acc[name] = error
    }

    return acc
  }, {} as { [key in string]: string })

  if (Object.keys(errors).length) {
    return errors
  }

  return
}

export default validate
