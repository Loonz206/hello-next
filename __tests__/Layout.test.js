import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "../components/Layout";

describe("Layout", () => {
  test("renders Layout component and finds the main content class", () => {
    const { container } = render(<Layout />);
    expect(container.querySelector("#main-content")).toBeInTheDocument();
  });
});
