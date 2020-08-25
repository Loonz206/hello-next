import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../components/Footer";

describe("Footer Component", () => {
  test("should have the copyright in the footer", () => {
    const date = new Date().getFullYear();
    const { getByText } = render(<Footer />);
    // screen.debug() don't forget to import screen
    expect(
      getByText(`Built with Next JS | Copyright 2020-${date}`)
    ).toBeInTheDocument();
  });
});
