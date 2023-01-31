import { Review } from 'store/slices/reviewSlice'

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
  if (!/^[A-Za-z0-9 ]+$/.test(comment)) {
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

const validate = (values: Omit<Review, 'id' | 'createdAt'>) => {
  const errors = Object.entries(values).reduce((acc, [name, value]) => {
    const error = validators[name as keyof Validators]?.(String(value))

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

export const fields = {
  name: {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter Your Name',
    helperText: {
      generic: 'Minimum length is 4 upto 20 characters',
      empty:
        'Please enter a name that does not contain special characters (minimum 6 upto 20 characters)',
      requiredLength: 'name should be minimum 6 upto 20 characters',
      requiredPattern: `name can't use numbers or special characters`,
    },
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    helperText: {
      generic: 'Enter a valid email',
      empty: 'Please enter an email',
      requiredLength: '',
      requiredPattern: 'email is not valid',
    },
  },
  rating: {
    name: 'rating',
    label: 'rating',
    placeholder: '',
    helperText: {
      generic: 'Must be between 1 to 5',
      empty: 'Please rate the item (minimum 1 upto 5)',
      requiredLength: 'Rating should be minimum 1 upto 5',
      requiredPattern: '',
    },
  },
  comment: {
    name: 'comment',
    label: 'Comment',
    placeholder: 'Enter Your Comment',
    helperText: {
      generic: 'Minimum length is 20 characters upto 100',
      empty: 'Please enter a comment (minimum 20 upto 100 characters)',
      requiredLength: 'comment should be minimum 20 upto 100 characters',
      requiredPattern: `comment can't use special characters`,
    },
  },
  recommend: {
    name: 'recommend',
    label: 'Recommend',
    options: [
      {
        label: 'None',
        value: 'undefined',
      },
      {
        label: 'Yes',
        value: 'true',
      },
      {
        label: 'No',
        value: 'false',
      },
    ],
    helperText: {
      generic: 'Would you recommend this item? (optional)',
    },
  },
}
