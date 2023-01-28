import { act } from 'react-dom/test-utils'
import { renderHook } from 'utils/test-utils'
import useFeedbackForm from './useFeedbackForm'

describe('useFeedbackForm', () => {
  const initialValues = {
    hover: 0,
    onRatingHover: expect.any(Function),
    onSubmit: expect.any(Function),
  }

  it('Should return initial values', () => {
    const { result } = renderHook(() => useFeedbackForm())

    expect(result.current).toEqual(initialValues)
  })

  it('Should change hover values, when onRatingHover is invoked', () => {
    const { result } = renderHook(() => useFeedbackForm())

    act(() => {
      result.current.onRatingHover(null, 3)
    })

    expect(result.current.hover).toEqual(3)

    act(() => {
      result.current.onRatingHover(null, 1)
    })

    expect(result.current.hover).toEqual(1)
  })
})
