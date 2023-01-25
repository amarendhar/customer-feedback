import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rootReducer } from 'store'
import ThemeProvider from 'themes/ThemeProvider'
import App from 'App'

const store = configureStore({ reducer: rootReducer, preloadedState: {} })

const render = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>
        {route ? <App /> : <BrowserRouter>{children}</BrowserRouter>}
      </ThemeProvider>
    </Provider>
  )

  return {
    user: userEvent.setup(),
    ...rtlRender(ui, {
      wrapper: Wrapper,
    }),
  }
}

const renderHook = (hook) => {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  return rtlRenderHook(() => hook(), { wrapper })
}

export * from '@testing-library/react'
export { render, renderHook }
