import GlobalStyle from "../../globalStyles";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("start");

  function handleChangeMode(mode) {
    setMode(mode);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        mode={mode}
        handleChangeMode={handleChangeMode}
      />
    </>
  );
}
