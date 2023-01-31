import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  FormHelperText,
  Rating,
  Typography,
  MenuItem,
} from '@mui/material'
import { Star } from '@mui/icons-material'
import { TextField } from 'mui-rff'
import { Field, Form } from 'react-final-form'
import useFeedbackForm from './useFeedbackForm'
import validate, { fields } from 'utils/validators'
import { Review } from 'store/slices/reviewSlice'

type FeedbackFormProps = {
  initialValues: Omit<Review, 'id' | 'createdAt'>
}
const FeedbackForm = ({ initialValues }: FeedbackFormProps) => {
  const { hover, onRatingHover, onSubmit } = useFeedbackForm()

  return (
    <>
      <Typography fontSize="23px" fontWeight="bold" m="15px">
        Feedback Form
      </Typography>
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
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
                <Field name={fields.rating.name} component={() => null} />
                <RatingContainer data-testid={fields.rating.name}>
                  <Typography component="legend">
                    Rating (1-5 stars) *
                  </Typography>
                  <RatingComponent
                    rating={rating}
                    hover={hover}
                    onChange={(e, newValue) => {
                      form.change('rating', Number(newValue))
                      form.resetFieldState('rating')
                      if (touched) {
                        touched.rating = true
                      }
                    }}
                    onChangeActive={onRatingHover}
                  />
                  <FormHelperText
                    sx={{ m: '0 14px', mt: '3px' }}
                    error={touched?.rating && !!errors?.rating}
                  >
                    {touched?.rating && errors?.rating
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
                <TextField
                  inputProps={{
                    'data-testid': fields.recommend.name,
                  }}
                  name={fields.recommend.name}
                  label={fields.recommend.label}
                  helperText={fields.recommend.helperText.generic}
                  select
                  variant="outlined"
                >
                  {fields.recommend.options.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Comments>
              <Submit>
                <Button type="submit" variant="outlined">
                  Submit Feedback
                </Button>
              </Submit>
            </FormControl>
          )
        }}
      </Form>
    </>
  )
}

export default FeedbackForm

type RatingComponentProps = {
  rating: number
  hover: number
  onChange: (event: React.SyntheticEvent, value: number | null) => void
  onChangeActive: (event: React.SyntheticEvent, value: number) => void
}

const ratingLabels: { [key in string]: string } = {
  0: '',
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
    <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : rating]}</Box>
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

const Submit = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: ${({ theme }) => theme.space.lg}px;
  margin-bottom: ${({ theme }) => theme.space.lg}px !important;

  ${({ theme }) => theme.mediaQueries['<md']} {
    justify-content: center;
  }
`
