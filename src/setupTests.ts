// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const mockUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockUsedNavigate,
}))

beforeEach(() => {
  jest.resetAllMocks()
})
