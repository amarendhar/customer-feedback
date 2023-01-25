import React from 'react'
import { render, screen, waitFor } from 'utils/test-utils'
import NotFound from './index'

describe('NotFound', () => {
  it('Should render loading-component initially', () => {
    render(<NotFound />, {
      route: '/not-found',
    })

    screen.getByTestId('not-found-page')
    expect(screen.getByTestId('not-found-title').textContent).toEqual(
      'Page Not Found'
    )
    expect(screen.getByTestId('not-found-goback').textContent).toEqual(
      'Go Back'
    )
  })

  it.skip('Should redirect to home-page onclick of goback', async () => {
    render(<NotFound />, {
      route: '/not-found',
    })

    screen.getByTestId('not-found-goback').click()

    await waitFor(() => {
      screen.getByTestId('home-page')
    })
  })
})
