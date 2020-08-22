import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/Header";

describe("Header", () => {
  test("renders Header component", () => {
    const greetings = ["Hello", "About", "Contact"];
    const { getByText } = render(<Header />);
    expect(getByText(greetings[0])).toBeInTheDocument();
    expect(getByText(greetings[1])).toBeInTheDocument();
    expect(getByText(greetings[2])).toBeInTheDocument();
    screen.debug();
  });
});
