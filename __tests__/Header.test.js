import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "../components/Header";

describe("Header", () => {
  test("renders Header component", () => {
    render(<Header />);

    screen.debug();
  });
});
