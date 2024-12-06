import { createGlobalStyle } from "styled-components";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["variable"],
  style: ["normal"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    overflow-wrap: break-word;
    -webkit-tap-highlight-color: transparent;
  }

  :root {
    --primary-light: #E418CD;
    --primary-dark: #14142A;
    --secondary-light: #8E39EA;
    --neutral-light: #F1E6F1;
    --neutral-dark: #645462;
    --gradient: linear-gradient(90deg, var(--primary-light), var(--secondary-light));

    --main-headline:  600 1.45rem ${instrumentSans.style.fontFamily}, system-ui;
    --board-headline:  400 0.95rem ${instrumentSans.style.fontFamily}, system-ui;
    --instruction: 600 0.8rem ${instrumentSans.style.fontFamily}, system-ui;
    --question: 400 0.8rem ${instrumentSans.style.fontFamily}, system-ui;
    --regular: 400 0.625rem ${instrumentSans.style.fontFamily}, system-ui;
    --button: 400 0.75rem ${instrumentSans.style.fontFamily}, system-ui;

    ::-webkit-scrollbar { display: none; };

    scrollbar-width: none; 
    overflow: auto;
}

  body {
    background-color: var(--primary-dark);
    font-family: ${instrumentSans.style.fontFamily}, system-ui;
  }


input, select, button {
  font-family: inherit;
}

`;
