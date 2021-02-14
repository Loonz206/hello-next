import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // rendered only on the server, no onClick nor events
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* Outside of main will NOT be initialized by the browser, no app logic */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
