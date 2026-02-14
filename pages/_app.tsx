import { useEffect, createContext } from "react";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Some global styles but then afterward css module pattern instead
import "../src/styles/globals.scss";

import { AppProps } from "next/app";

export const PageContext = createContext("");

type GlobalFallbackProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
};

function GlobalFallback({
  title = "Something went wrong",
  description = "We're still on it — you can try reloading the page or go back to safety.",
  ctaLabel = "Reload",
}: Readonly<GlobalFallbackProps>) {
  return (
    <div role="alert" style={{ padding: 24, textAlign: "center" }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => globalThis.location.reload()}>{ctaLabel}</button>
      </div>
    </div>
  );
}

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body && !body.classList.contains("js")) {
      body.classList.add("js");
    }
  }, []);
  const HydrationSafeErrorBoundary = dynamic(
    () =>
      import("../src/utils/HydrationSafeErrorBoundary").then(
        (m) => m.default ?? m,
      ),
    { ssr: false },
  );

  return (
    <PageContext.Provider value={pageProps.pageContext}>
      <HydrationSafeErrorBoundary
        fallback={
          <GlobalFallback
            title="Something went wrong"
            description="We're still on it — you can try reloading the page or go back to safety."
            ctaLabel="Reload"
          />
        }
      >
        <Component {...pageProps} />
      </HydrationSafeErrorBoundary>
      <SpeedInsights />
    </PageContext.Provider>
  );
};

export default App;
