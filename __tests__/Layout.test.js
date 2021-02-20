import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import Layout from "../src/components/Layout";

describe("Layout", () => {
  afterEach(cleanup);

  test("renders Layout component and finds the main content class", () => {
    act(() => {
      const { container } = render(<Layout />);
      expect(container.querySelector("#wrap")).toBeInTheDocument();
    });
  });
});
