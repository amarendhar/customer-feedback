import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Toolbar from '@mui/material/Toolbar'
import { Header, Footer } from 'containers'

const Layout = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Layout

const Container = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`
