import { fireEvent, render, screen, act } from 'utils/test-utils'
import { initialValues } from '.'
import FeedbackForm from './FeedbackForm'
import { fields } from 'utils/validators'

describe('FeedbackForm', () => {
  it('Should render fields with initialValues and generic-helperText', () => {
    render(<FeedbackForm initialValues={initialValues} />)

    const name = screen.getByTestId(fields.name.name) as HTMLInputElement
    const email = screen.getByTestId(fields.email.name) as HTMLInputElement
    const comment = screen.getByTestId(fields.comment.name) as HTMLInputElement
    const star = screen.getByLabelText('1 Star') as HTMLInputElement
    const recommend = screen.getByTestId(
      fields.recommend.name
    ) as HTMLInputElement

    expect(name.value).toEqual('')
    expect(email.value).toEqual('')
    expect(comment.value).toEqual('')
    expect(star.checked).toEqual(false)
    expect(recommend.value).toEqual('')
    screen.getByText(fields.name.helperText.generic)
    screen.getByText(fields.email.helperText.generic)
    screen.getByText(fields.rating.helperText.generic)
    screen.getByText(fields.comment.helperText.generic)
    screen.getByText(fields.recommend.helperText.generic)
  })

  it('Should change form, when field values are changed', async () => {
    render(<FeedbackForm initialValues={initialValues} />)

    const name = screen.getByTestId(fields.name.name) as HTMLInputElement
    const email = screen.getByTestId(fields.email.name) as HTMLInputElement
    const comment = screen.getByTestId(fields.comment.name) as HTMLInputElement
    const recommend = screen.getByTestId(fields.recommend.name) as HTMLInputElement

    fireEvent.change(name, { target: { value: 'Amarendhar' } })
    fireEvent.change(email, { target: { value: 'amarendhar.ganji@yahoo.com' } })
    fireEvent.change(comment, { target: { value: 'comment' } })
    act(() => {
      screen.getByLabelText('1 Star').click()
    })
    fireEvent.change(recommend, { target: { value: true } })

    expect(name.value).toEqual('Amarendhar')
    expect(email.value).toEqual('amarendhar.ganji@yahoo.com')
    expect(comment.value).toEqual('comment')
    expect(
      (screen.getByLabelText('1 Star') as HTMLInputElement).checked
    ).toEqual(true)
    expect(recommend.value).toEqual('true')
  })

  it('Should render helperText with validation-error-messages', () => {
    render(<FeedbackForm initialValues={initialValues} />)

    const name = screen.getByTestId('name') as HTMLInputElement
    const email = screen.getByTestId('email') as HTMLInputElement
    const comment = screen.getByTestId('comment') as HTMLInputElement

    fireEvent.change(name, { target: { value: 'Amar' } })
    fireEvent.change(email, { target: { value: 'amar@yahoo' } })
    fireEvent.change(comment, { target: { value: 'comment' } })

    expect(name.value).toEqual('Amar')
    expect(email.value).toEqual('amar@yahoo')
    expect(comment.value).toEqual('comment')
    screen.getByText(fields.name.helperText.requiredLength)
    screen.getByText(fields.email.helperText.requiredPattern)
    screen.getByText(fields.comment.helperText.requiredLength)

    fireEvent.change(name, { target: { value: 'Amarendhar----' } })
    fireEvent.change(comment, {
      target: { value: 'This is really a good proudct ##' },
    })

    screen.getByText(fields.name.helperText.requiredPattern)
    screen.getByText(fields.comment.helperText.requiredPattern)
  })
})
