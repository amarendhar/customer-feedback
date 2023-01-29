import React from 'react'
import styled from 'styled-components'
import { Box, Button, FormHelperText, Rating, Typography } from '@mui/material'
import { Star } from '@mui/icons-material'
import { TextField } from 'mui-rff'
import { Field, Form } from 'react-final-form'
import useFeedbackForm, { FormValues } from './useFeedbackForm'
import validate from 'utils/validators'

type FeedbackFormProps = {
  initialValues: FormValues
}

const FeedbackForm = ({ initialValues }: FeedbackFormProps) => {
  const { hover, onRatingHover, onSubmit } = useFeedbackForm()

  return (
    <Form initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {(formData) => {
        const {
          values: { rating },
          handleSubmit,
          form,
          errors,
          touched,
        } = formData

        return (
          <FormControl onSubmit={handleSubmit}>
            <Details>
              <TextField
                inputProps={{
                  'data-testid': fields.name.name,
                }}
                name={fields.name.name}
                label={fields.name.label}
                placeholder={fields.name.placeholder}
                helperText={fields.name.helperText.generic}
                type="text"
                variant="outlined"
                required
              />
              <TextField
                inputProps={{
                  'data-testid': fields.email.name,
                }}
                name={fields.email.name}
                label={fields.email.label}
                placeholder={fields.email.placeholder}
                helperText={fields.email.helperText.generic}
                type="email"
                variant="outlined"
                required
              />
              <RatingContainer data-testid={fields.rating.name}>
                <Typography component="legend">Rating (1-5 stars) *</Typography>
                <Field
                  name={fields.rating.name}
                  component={() => (
                    <RatingComponent
                      rating={rating}
                      hover={hover}
                      onChange={(e, newValue) =>
                        newValue && form.change('rating', newValue)
                      }
                      onChangeActive={onRatingHover}
                    />
                  )}
                />
                <FormHelperText
                  sx={{ m: '0 14px', mt: '3px' }}
                  error={touched?.rating}
                >
                  {touched?.rating
                    ? errors?.rating
                    : fields.rating.helperText.generic}
                </FormHelperText>
              </RatingContainer>
            </Details>
            <Comments>
              <TextField
                inputProps={{
                  'data-testid': fields.comment.name,
                }}
                name={fields.comment.name}
                label={fields.comment.label}
                placeholder={fields.comment.placeholder}
                helperText={fields.comment.helperText.generic}
                variant="outlined"
                multiline
                rows={5}
                required
              />
              <Submit type="submit" variant="outlined">
                Submit Feedback
              </Submit>
            </Comments>
          </FormControl>
        )
      }}
    </Form>
  )
}

export default FeedbackForm

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
      requiredPattern: `comment can't use numbers or special characters`,
    },
  },
}

type RatingComponentProps = {
  rating: null | number
  hover: number
  onChange: (event: React.SyntheticEvent, value: number | null) => void
  onChangeActive: (event: React.SyntheticEvent, value: number) => void
}

const ratingLabels: { [key in string]: string } = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
}

const RatingComponent = ({
  rating,
  hover,
  onChange,
  onChangeActive,
}: RatingComponentProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Rating
      size="large"
      name="rating"
      value={rating}
      onChange={onChange}
      onChangeActive={onChangeActive}
      emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
    />
    {rating && (
      <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : rating]}</Box>
    )}
  </Box>
)

const FormControl = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.lg}px;
  grid-gap: ${({ theme }) => theme.space.xxl}px;

  max-width: 40%;
  flex-basis: 40%;

  ${({ theme }) => theme.mediaQueries['<md']} {
    max-width: 100%;
    flex-basis: 100%;
  }
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.lg}px;
  grid-gap: ${({ theme }) => theme.space.xl}px !important;

  max-width: 60%;
  flex-basis: 60%;

  ${({ theme }) => theme.mediaQueries['<md']} {
    max-width: 100%;
    flex-basis: 100%;
  }
`

const Submit = styled(Button)`
  align-self: end;

  ${({ theme }) => theme.mediaQueries['<md']} {
    align-self: center;
    margin-bottom: ${({ theme }) => theme.space.lg}px !important;
  }
`
