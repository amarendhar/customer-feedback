import React from 'react'
import styled from 'styled-components'

const Footer = () => (
  <Container>
    <span>
      <span>Copyright@2022 Feedback Reviews, All rights reserved.</span>
    </span>
  </Container>
)

export default Footer

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;

  font-size: ${({ theme }) => theme.fontSizes.sm}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;

  padding: ${({ theme }) => theme.space.md}px;

  background-color: rgba(0, 0, 0, 0.8);
  color: ${({ theme }) => theme.palette.text.dark};
`
