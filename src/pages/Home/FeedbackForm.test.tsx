import { act } from 'react-dom/test-utils'
import { fireEvent, render, screen } from 'utils/test-utils'
import { initialValues } from '.'
import FeedbackForm from './FeedbackForm'

describe('FeedbackForm', () => {
  it('Should render with initialValues', () => {
    render(<FeedbackForm initialValues={initialValues} />)

    const name = screen.getByTestId('name') as HTMLInputElement
    const email = screen.getByTestId('email') as HTMLInputElement
    const comment = screen.getByTestId('comment') as HTMLInputElement
    expect(name.value).toEqual('')
    expect(email.value).toEqual('')
    expect(comment.value).toEqual('')
    expect(
      (screen.getByLabelText('1 Star') as HTMLInputElement).checked
    ).toEqual(false)
  })

  it('Should change form, when field values are changed', async () => {
    render(<FeedbackForm initialValues={initialValues} />)

    const name = screen.getByTestId('name') as HTMLInputElement
    const email = screen.getByTestId('email') as HTMLInputElement
    const comment = screen.getByTestId('comment') as HTMLInputElement

    fireEvent.change(name, { target: { value: 'Amarendhar' } })
    fireEvent.change(email, { target: { value: 'amarendhar.ganji@yahoo.com' } })
    fireEvent.change(comment, { target: { value: 'comment' } })
    act(() => {
      screen.getByLabelText('1 Star').click()
    })

    expect(name.value).toEqual('Amarendhar')
    expect(email.value).toEqual('amarendhar.ganji@yahoo.com')
    expect(comment.value).toEqual('comment')
    expect(
      (screen.getByLabelText('1 Star') as HTMLInputElement).checked
    ).toEqual(true)
  })
})
