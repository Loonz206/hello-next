import { useEffect, createContext } from "react";
// Some global styles but then afterward css module pattern instead
import "../src/styles/globals.scss";

export const PageContext = createContext("");

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body && !body.classList.contains("js")) {
      body.classList.add("js");
    }
  }, []);
  return (
    <PageContext.Provider value={pageProps.pageContext}>
      <Component {...pageProps} />
    </PageContext.Provider>
  );
};

export default App;
