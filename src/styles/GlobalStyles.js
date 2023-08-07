import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
${reset}
  * {
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    font-size: 16px;
  }

  #root, .App {
    height: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, input, textarea, select, option {
    font-family: inherit;
    border: 0;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
