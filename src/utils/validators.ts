import { FormValues } from 'pages/Home/useFeedbackForm'

export const validateName = (name: string) => {
  if (!name) {
    return 'Please enter a name that does not contain special characters (minimum 6 upto 20 characters)'
  }
  if (name.length < 6 || name.length > 20) {
    return 'name should be minimum 6 upto 20 characters'
  }
  if (!/^[A-Za-z ]+$/.test(name)) {
    return "name can't use numbers or special characters"
  }

  return ''
}

export const validateEmailID = (emailId: string) => {
  if (!emailId) {
    return 'Please enter an email'
  }
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailId
    )
  ) {
    return 'email is not valid'
  }

  return ''
}

export const validateRating = (rating: string) => {
  const normalizeRating = Number(rating)

  if (!normalizeRating) {
    return 'Please rate the item (minimum 1 upto 5)'
  }
  if (normalizeRating < 1 || normalizeRating > 5) {
    return 'Rating should be minimum 1 upto 5'
  }

  return ''
}

export const validateComment = (comment: string) => {
  if (!comment) {
    return 'Please enter a comment (minimum 20 upto 100 characters)'
  }
  if (comment.length < 20 || comment.length > 100) {
    return 'comment should be minimum 20 upto 100 characters'
  }
  if (!/^[A-Za-z ]+$/.test(comment)) {
    return "comment can't use numbers or special characters"
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
