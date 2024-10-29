// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #141414;
    color: #ffffff;
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  h1, h2, h3 {
    color: #ffffff;
  }

  a {
    color: #e50914;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .container {
    padding: 20px;
  }

  .row {
    margin: 0;
  }
`;

export default GlobalStyles;
