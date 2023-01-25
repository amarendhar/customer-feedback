import { createGlobalStyle } from 'styled-components'
import { theme } from './ThemeProvider'

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: Open-Sans, Sans-Serif, Helvetica;
    min-height: 100vh;
  }

  #root {
    position: relative;
    
    display: flex;
    flex-direction: column;
    
    padding-bottom: 40px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyle
