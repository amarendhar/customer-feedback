import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NotFound = () => (
  <Container data-testid="not-found-page">
    <div data-testid="not-found-title">Page Not Found</div>
    <NavLink data-testid="not-found-goback" to="/" className="selected">
      Go Back
    </NavLink>
  </Container>
)

export default NotFound

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.space.lg}px;

  a {
    padding-top: ${({ theme }) => theme.space.lg}px;
  }
`
